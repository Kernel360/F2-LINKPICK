package techpick.api.domain.sharedFolder.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import techpick.api.domain.folder.exception.ApiFolderException;
import techpick.api.domain.sharedFolder.dto.FolderNode;
import techpick.api.domain.sharedFolder.dto.PickNode;
import techpick.api.domain.sharedFolder.dto.SharedFolderCommand;
import techpick.api.domain.sharedFolder.dto.SharedFolderMapper;
import techpick.api.domain.sharedFolder.dto.SharedFolderResult;
import techpick.api.domain.sharedFolder.exception.ApiSharedFolderException;
import techpick.api.infrastructure.folder.FolderDataHandler;
import techpick.api.infrastructure.pick.PickDataHandler;
import techpick.api.infrastructure.sharedFolder.SharedFolderDataHandler;
import techpick.api.infrastructure.tag.TagDataHandler;
import techpick.core.model.folder.Folder;
import techpick.core.model.pick.Pick;
import techpick.core.model.sharedFolder.SharedFolder;
import techpick.core.model.tag.Tag;

@Service
@RequiredArgsConstructor
public class SharedFolderService {

	private final SharedFolderDataHandler sharedFolderDataHandler;
	private final FolderDataHandler folderDataHandler;
	private final PickDataHandler pickDataHandler;
	private final TagDataHandler tagDataHandler;
	private final SharedFolderMapper sharedFolderMapper;
	private final ObjectMapper objectMapper = new ObjectMapper();

	@Transactional
	public SharedFolderResult.Folder createSharedFolder(SharedFolderCommand.Create command) throws
		JsonProcessingException {
		LocalDateTime now = LocalDateTime.now();
		// 공유할 폴더들을 하나로 묶기 위한 가상의 최상위 폴더를 생성
		// 이때 해당 폴더의 이름은 공유할때 입력으로 받아옴
		FolderNode root = FolderNode.builder()
			.name(command.name())
			.folders(new ArrayList<>())
			.createdAt(now.toString()) // ObjectMapper 파싱 에러를 막기위해 String 으로 넣음
			.build();
		List<Folder> folderList = folderDataHandler.getFolderListPreservingOrder(command.folderIdList());
		for (Folder folder : folderList) {
			validateFolderAccess(command.userId(), folder);
			searchFolder(root, folder);
		}

		String jsonData = objectMapper.writeValueAsString(root);

		return sharedFolderMapper.toResultFolder(sharedFolderDataHandler.save(command.userId(), jsonData, now));
	}

	@Transactional(readOnly = true)
	public SharedFolderResult.Folder getSharedFolder(UUID uuid) {
		return sharedFolderMapper.toResultFolder(sharedFolderDataHandler.getByUUID(uuid));
	}

	@Transactional(readOnly = true)
	public List<SharedFolderResult.List> getSharedFolderListByUserId(Long userId) {
		return sharedFolderDataHandler.getByUserId(userId).stream()
			.map(sharedFolderMapper::toResultList).toList();
	}

	@Transactional
	public void deleteSharedFolder(SharedFolderCommand.Delete command) {
		SharedFolder sharedFolder = sharedFolderDataHandler.getByUUID(command.uuid());
		validateSharedFolderAccess(command.userId(), sharedFolder);

		sharedFolderDataHandler.deleteByUUID(command.uuid());
	}

	// 이미 db에 저장된 폴더를 탐색하는것이기에 검증을 따로 진행하지 않음.
	private void searchFolder(FolderNode parentFolder, Folder folder) {

		FolderNode folderNode = sharedFolderMapper.toFolderNode(folder);
		parentFolder.folders().add(folderNode);

		List<Folder> childFolderList = folderDataHandler.getFolderListPreservingOrder(
			folder.getChildFolderIdOrderedList());
		for (Folder childFolder : childFolderList) {
			searchFolder(folderNode, childFolder);
		}

		List<Pick> childPickList = pickDataHandler.getPickListPreservingOrder(folder.getChildPickIdOrderedList());
		for (Pick childPick : childPickList) {
			PickNode pickNode = sharedFolderMapper.toPickNode(childPick);
			List<Tag> tagList = tagDataHandler.getTagListPreservingOrder(childPick.getTagIdOrderedList());
			for (Tag tag : tagList) {
				pickNode.tags().add(sharedFolderMapper.toTagNode(tag));
			}
			folderNode.picks().add(pickNode);
		}
	}

	private void validateFolderAccess(Long userId, Folder folder) {
		if (!folder.getUser().getId().equals(userId)) {
			throw ApiFolderException.FOLDER_ACCESS_DENIED();
		}
	}

	private void validateSharedFolderAccess(Long userId, SharedFolder sharedFolder) {
		if (!sharedFolder.getUser().getId().equals(userId)) {
			throw ApiSharedFolderException.SHARED_FOLDER_UNAUTHORIZED();
		}
	}
}
