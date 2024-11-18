package techpick.api.infrastructure.pick;

import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import techpick.api.domain.folder.exception.ApiFolderException;
import techpick.api.domain.link.dto.LinkMapper;
import techpick.api.domain.pick.dto.PickCommand;
import techpick.api.domain.pick.dto.PickMapper;
import techpick.api.domain.pick.exception.ApiPickException;
import techpick.api.domain.tag.exception.ApiTagException;
import techpick.api.domain.user.exception.ApiUserException;
import techpick.core.model.folder.Folder;
import techpick.core.model.folder.FolderRepository;
import techpick.core.model.link.Link;
import techpick.core.model.link.LinkRepository;
import techpick.core.model.pick.Pick;
import techpick.core.model.pick.PickRepository;
import techpick.core.model.pick.PickTag;
import techpick.core.model.pick.PickTagRepository;
import techpick.core.model.tag.Tag;
import techpick.core.model.tag.TagRepository;
import techpick.core.model.user.User;
import techpick.core.model.user.UserRepository;

@Slf4j
@Component
@RequiredArgsConstructor
public class PickDataHandler {

	private final PickMapper pickMapper;
	private final PickRepository pickRepository;
	private final PickTagRepository pickTagRepository;
	private final UserRepository userRepository;
	private final FolderRepository folderRepository;
	private final LinkRepository linkRepository;
	private final LinkMapper linkMapper;
	private final TagRepository tagRepository;

	@Transactional(readOnly = true)
	public Pick getPick(Long pickId) {
		return pickRepository.findById(pickId).orElseThrow(ApiPickException::PICK_NOT_FOUND);
	}

	@Transactional(readOnly = true)
	public Pick getPickUrl(Long userId, String url) {
		return pickRepository.findByUserIdAndLinkUrl(userId, url)
			.orElseThrow(ApiPickException::PICK_NOT_FOUND);
	}

	@Transactional(readOnly = true)
	public List<Pick> getPickList(List<Long> pickIdList) {
		List<Pick> pickList = pickRepository.findAllById(pickIdList);
		// 조회리스트에 존재하지 않는 픽이 있으면 예외 발생
		if (pickList.size() != pickIdList.size()) {
			throw ApiPickException.PICK_NOT_FOUND();
		}
		return pickList;
	}

	@Transactional(readOnly = true)
	public List<Pick> getPickListPreservingOrder(List<Long> pickIdList) {
		List<Pick> pickList = pickRepository.findAllById(pickIdList);
		// 조회리스트에 존재하지 않는 픽이 있으면 예외 발생
		if (pickList.size() != pickIdList.size()) {
			throw ApiPickException.PICK_NOT_FOUND();
		}
		pickList.sort(Comparator.comparing(pick -> pickIdList.indexOf(pick.getId())));
		return pickList;
	}

	@Transactional(readOnly = true)
	public List<PickTag> getPickTagList(Long pickId) {
		return pickTagRepository.findAllByPickId(pickId);
	}

	@Transactional
	public Pick savePick(PickCommand.Create command) throws ApiPickException {
		User user = userRepository.findById(command.userId()).orElseThrow(ApiUserException::USER_NOT_FOUND);
		Folder folder = folderRepository.findById(command.parentFolderId())
			.orElseThrow(ApiFolderException::FOLDER_NOT_FOUND);
		Link link = linkRepository.findByUrl(command.linkInfo().url())
			.map(existLink -> {
				existLink.updateMetadata(command.linkInfo().title(), command.linkInfo().description(),
					command.linkInfo().imageUrl());
				return existLink;
			})
			.orElseGet(() -> linkRepository.save(linkMapper.of(command.linkInfo())));

		// 픽 존재 여부 검증
		pickRepository.findByUserAndLink(user, link)
			.ifPresent((__) -> {
				throw ApiPickException.PICK_MUST_BE_UNIQUE_FOR_A_URL();
			});

		Pick savedPick = pickRepository.save(pickMapper.toEntity(command, user, folder, link));
		savedPick.getParentFolder().addChildPickIdOrdered(savedPick.getId());
		List<PickTag> pickTagList = tagRepository.findAllById(command.tagIdOrderedList())
			.stream()
			.map(tag -> PickTag.of(savedPick, tag))
			.toList();
		pickTagRepository.saveAll(pickTagList);

		return savedPick;
	}

	@Transactional
	public Pick updatePick(PickCommand.Update command) {
		Pick pick = getPick(command.id());
		pick.updateTitle(command.title());
		if (command.parentFolderId() != null) {
			pick.updateParentFolder(
				folderRepository.findById(command.parentFolderId()).orElseThrow(ApiFolderException::FOLDER_NOT_FOUND));
		}
		if (command.tagIdOrderedList() != null) {
			updateNewTagIdList(pick, command.tagIdOrderedList());
		}
		return pick;
	}

	@Transactional
	public void movePickToCurrentFolder(PickCommand.Move command) {
		List<Long> pickIdList = command.idList();
		Folder folder = folderRepository.findById(command.destinationFolderId())
			.orElseThrow(ApiFolderException::FOLDER_NOT_FOUND);
		folder.updateChildPickIdOrderedList(pickIdList, command.orderIdx());
	}

	@Transactional
	public void movePickToOtherFolder(PickCommand.Move command) {
		List<Long> pickIdList = command.idList();
		Folder destinationFolder = folderRepository.findById(command.destinationFolderId())
			.orElseThrow(ApiFolderException::FOLDER_NOT_FOUND);
		destinationFolder.updateChildPickIdOrderedList(pickIdList, command.orderIdx());

		for (Long pickId : pickIdList) {
			Pick pick = getPick(pickId);
			pick.getParentFolder().removeChildPickOrder(pickId);
			pick.updateParentFolder(destinationFolder);
		}
	}

	@Transactional
	public void movePickListToRecycleBin(Long userId, List<Long> pickIdList) {
		// 휴지통에 픽 추가
		Folder recycleBin = folderRepository.findRecycleBinByUserId(userId);
		recycleBin.getChildPickIdOrderedList().addAll(0, pickIdList);

		// 픽들의 부모를 휴지통으로 변경
		List<Pick> pickList = pickRepository.findAllById(pickIdList);
		pickList.forEach(pick -> pick.updateParentFolder(recycleBin));
	}

	@Transactional
	public void deletePickList(PickCommand.Delete command) {
		List<Long> pickIdList = command.idList();
		for (Long pickId : pickIdList) {
			Pick pick = getPick(pickId);
			pick.getParentFolder().removeChildPickOrder(pickId);
			pickTagRepository.deleteByPick(pick);
			pickRepository.delete(pick);
		}
	}

	@Transactional
	public void attachTagToPick(Pick pick, Long tagId) {
		Tag tag = tagRepository.findById(tagId)
			.orElseThrow(ApiTagException::TAG_NOT_FOUND);
		PickTag pickTag = PickTag.of(pick, tag);
		pickTagRepository.save(pickTag);
	}

	@Transactional
	public void detachTagFromPick(Pick pick, Long tagId) {
		pickTagRepository.deleteByPickAndTagId(pick, tagId);
	}

	private void updateNewTagIdList(Pick pick, List<Long> newTagOrderList) {
		// 1. 기존 태그와 새로운 태그를 비교하여 없어진 태그를 PickTag 테이블에서 제거
		pick.getTagIdOrderedList().stream()
			.filter(tagId -> !newTagOrderList.contains(tagId))
			.forEach(tagId -> detachTagFromPick(pick, tagId));

		// 2. 새로운 태그 중 기존에 없는 태그를 PickTag 테이블에 추가
		newTagOrderList.stream()
			.filter(tagId -> !pick.getTagIdOrderedList().contains(tagId))
			.forEach(tagId -> attachTagToPick(pick, tagId));

		pick.updateTagOrderList(newTagOrderList);
	}

}

