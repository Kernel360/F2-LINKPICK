package techpick.api.domain.folder.service;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Queue;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.apache.commons.lang3.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import techpick.api.domain.folder.dto.FolderCommand;
import techpick.api.domain.folder.dto.FolderMapper;
import techpick.api.domain.folder.dto.FolderResult;
import techpick.api.domain.folder.exception.ApiFolderException;
import techpick.api.infrastructure.folder.FolderDataHandler;
import techpick.api.infrastructure.pick.PickDataHandler;
import techpick.core.model.folder.Folder;
import techpick.core.model.folder.FolderType;

@Service
@RequiredArgsConstructor
public class FolderService {

	private final FolderDataHandler folderDataHandler;
	private final FolderMapper folderMapper;
	private final PickDataHandler pickDataHandler;

	@Transactional(readOnly = true)
	public FolderResult getFolder(FolderCommand.Read command) {
		Folder folder = folderDataHandler.getFolder(command.id());

		validateFolderAccess(command.userId(), folder);

		return folderMapper.toResult(folder);
	}

	@Transactional(readOnly = true)
	public List<FolderResult> getChildFolderList(FolderCommand.Read command) {
		Folder folder = folderDataHandler.getFolder(command.id());

		validateFolderAccess(command.userId(), folder);

		return folderDataHandler.getFolderListPreservingOrder(folder.getChildFolderIdOrderedList())
			.stream()
			.map(folderMapper::toResult)
			.toList();
	}

	// TODO: 현재는 1depth만 반환하고 있지만, 추후 ~3depth까지 반환할 예정
	@Transactional(readOnly = true)
	public List<FolderResult> getAllRootFolderList(Long userId) {
		Folder rootFolder = folderDataHandler.getRootFolder(userId);

		List<FolderResult> folderList = new ArrayList<>();
		folderList.add(folderMapper.toResult(rootFolder));

		rootFolder.getChildFolderIdOrderedList().stream()
			.map(folderDataHandler::getFolder)
			.map(folderMapper::toResult)
			.forEach(folderList::add);

		return folderList;
	}

	@Transactional(readOnly = true)
	public List<FolderResult> getBasicFolderList(Long userId) {
		return Stream.of(
				folderDataHandler.getRootFolder(userId),
				folderDataHandler.getUnclassifiedFolder(userId),
				folderDataHandler.getRecycleBin(userId)
			)
			.map(folderMapper::toResult)
			.toList();
	}

	/**
	 * 생성하려는 폴더가 미분류폴더, 휴지통이 아닌지 검증합니다.
	 * */
	@Transactional
	public FolderResult saveFolder(FolderCommand.Create command) {
		Folder parentFolder = folderDataHandler.getFolder(command.parentFolderId());
		validateFolderAccess(command.userId(), parentFolder);
		validateDestinationFolder(parentFolder);

		return folderMapper.toResult(folderDataHandler.saveFolder(command));
	}

	@Transactional
	public FolderResult updateFolder(FolderCommand.Update command) {

		Folder folder = folderDataHandler.getFolder(command.id());

		validateFolderAccess(command.userId(), folder);
		validateBasicFolderChange(folder);

		return folderMapper.toResult(folderDataHandler.updateFolder(command));
	}

	/**
	 * 현재 폴더들의 부모가 같은지 검증합니다.
	 * 이동하려는 폴더가 미분류폴더, 휴지통이 아닌지 검증합니다.
	 * */
	@Transactional
	public void moveFolder(FolderCommand.Move command) {
		Folder destinationFolder = folderDataHandler.getFolder(command.destinationFolderId());
		validateFolderAccess(command.userId(), destinationFolder);
		validateDestinationFolder(destinationFolder);

		List<Folder> folderList = folderDataHandler.getFolderList(command.idList());
		for (Folder folder : folderList) {
			validateFolderAccess(command.userId(), folder);
			validateBasicFolderChange(folder);
		}

		validateParentFolder(folderList, command.parentFolderId());
		if (Objects.equals(command.parentFolderId(), command.destinationFolderId())) {
			folderDataHandler.moveFolderWithinParent(command);
		} else {
			folderDataHandler.moveFolderToDifferentParent(command);
		}
	}

	@Transactional
	public void deleteFolder(FolderCommand.Delete command) {
		// 휴지통으로 이동되어야할 픽 리스트
		List<Long> targetPickIdList = new ArrayList<>();
		// 삭제할 폴더 리스트
		List<Folder> targetFolderList = folderDataHandler.getFolderList(command.idList());
		for (Folder folder : targetFolderList) {
			validateFolderAccess(command.userId(), folder);
			validateBasicFolderChange(folder);
		}
		// db 재귀조회를 하지 않기위해 본인 폴더를 모두 가져와서 Map 형태로 들고있음.
		// TODO: queryDSL을 사용해서 최적화 할 수 있으면 좋을거같음.
		Map<Long, Folder> folderMap = folderDataHandler.getFolderListByUserId(command.userId())
			.stream()
			.collect(Collectors.toMap(Folder::getId, folder -> folder));

		// BFS로 자식폴더들을 순회하며 삭제할 폴더 리스트와 휴지통으로 보낼 픽 리스트를 얻음
		Queue<Folder> queue = new ArrayDeque<>(targetFolderList);
		while (!queue.isEmpty()) {
			Folder folder = queue.poll();
			for (Long childFolderId : folder.getChildFolderIdOrderedList()) {
				Folder childFolder = folderMap.get(childFolderId);
				targetFolderList.add(childFolder);
				queue.add(childFolder);
			}
			targetPickIdList.addAll(folder.getChildPickIdOrderedList());
		}

		pickDataHandler.movePickListToRecycleBin(command.userId(), targetPickIdList);
		folderDataHandler.deleteFolderList(command);
	}

	private void validateFolderAccess(Long userId, Folder folder) {
		if (!folder.getUser().getId().equals(userId)) {
			throw ApiFolderException.FOLDER_ACCESS_DENIED();
		}
	}

	private void validateBasicFolderChange(Folder folder) {
		if (FolderType.GENERAL != folder.getFolderType()) {
			throw ApiFolderException.BASIC_FOLDER_CANNOT_CHANGED();
		}
	}

	/**
	 * 같은 폴더 내에서 순서를 변경하는 경우에 검증로직입니다.
	 * 이동하려는 폴더들의 부모가 실제 부모폴더와 일치하는지 검증합니다.
	 * */
	private void validateParentFolder(List<Folder> folderList, Long parentFolderId) {
		for (Folder folder : folderList) {
			Folder parentFolder = folder.getParentFolder();
			if (ObjectUtils.notEqual(parentFolder.getId(), parentFolderId)) {
				throw ApiFolderException.INVALID_PARENT_FOLDER();
			}
		}
	}

	/**
	 * 폴더 생성, 이동시 미분류폴더, 휴지통으로는 이동할 수 없습니다.
	 * */
	private void validateDestinationFolder(Folder destinationFolder) {
		if (Objects.equals(destinationFolder.getFolderType(), FolderType.UNCLASSIFIED)) {
			throw ApiFolderException.INVALID_TARGET();
		}
		if (Objects.equals(destinationFolder.getFolderType(), FolderType.RECYCLE_BIN)) {
			throw ApiFolderException.INVALID_TARGET();
		}
	}
}
