package kernel360.techpick.api.infrastructure.pick;

import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import kernel360.techpick.api.domain.folder.exception.ApiFolderException;
import kernel360.techpick.api.domain.link.dto.LinkMapper;
import kernel360.techpick.api.domain.pick.dto.PickCommand;
import kernel360.techpick.api.domain.pick.dto.PickMapper;
import kernel360.techpick.api.domain.pick.exception.ApiPickException;
import kernel360.techpick.api.domain.user.exception.ApiUserException;
import kernel360.techpick.core.model.folder.Folder;
import kernel360.techpick.core.model.folder.FolderRepository;
import kernel360.techpick.core.model.link.Link;
import kernel360.techpick.core.model.link.LinkRepository;
import kernel360.techpick.core.model.pick.Pick;
import kernel360.techpick.core.model.pick.PickRepository;
import kernel360.techpick.core.model.pick.PickTag;
import kernel360.techpick.core.model.pick.PickTagRepository;
import kernel360.techpick.core.model.tag.Tag;
import kernel360.techpick.core.model.user.User;
import kernel360.techpick.core.model.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class PickAdaptorImpl implements PickAdaptor {

	private final PickMapper pickMapper;
	private final PickRepository pickRepository;
	private final PickTagRepository pickTagRepository;
	private final UserRepository userRepository;
	private final FolderRepository folderRepository;
	private final LinkRepository linkRepository;
	private final LinkMapper linkMapper;

	@Override
	@Transactional(readOnly = true)
	public Pick getPick(Long pickId) {
		return pickRepository.findById(pickId).orElseThrow(ApiPickException::PICK_NOT_FOUND);
	}

	@Override
	@Transactional(readOnly = true)
	public Pick getPickUrl(Long userId, String url) {
		return pickRepository.findByUserIdAndLinkUrl(userId, url)
			.orElseThrow(ApiPickException::PICK_NOT_FOUND);
	}

	@Override
	@Transactional(readOnly = true)
	public List<Pick> getPickList(List<Long> idList) {
		return pickRepository.findAllById(idList);
	}

	@Override
	@Transactional(readOnly = true)
	public List<PickTag> getPickTagList(Long pickId) {
		return pickTagRepository.findAllByPickId(pickId);
	}

	@Override
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

		pickRepository.findByUserAndLink(user, link)
			.ifPresent((__) -> {
				throw ApiPickException.PICK_MUST_BE_UNIQUE_FOR_A_URL();
			});

		return pickRepository.save(pickMapper.toEntity(command, user, folder, link));
	}

	@Override
	@Transactional
	public PickTag savePickTag(Pick pick, Tag tag) {
		return pickTagRepository.save(PickTag.of(pick, tag));
	}

	@Override
	@Transactional
	public Pick updatePick(PickCommand.Update command) {
		Pick pick = getPick(command.pickId());
		pick.updateTitle(command.title()).updateMemo(command.memo());
		updateNewTagIdList(pick, command.tagIdList());
		return pick;
	}

	@Override
	@Transactional
	public void movePickToCurrentFolder(PickCommand.Move command) {
		List<Long> pickIdList = command.pickIdList();
		Folder folder = folderRepository.findById(command.destinationFolderId())
			.orElseThrow(ApiFolderException::FOLDER_NOT_FOUND);
		folder.updateChildPickOrderList(pickIdList, command.orderIdx());
	}

	@Override
	@Transactional
	public void movePickToOtherFolder(PickCommand.Move command) {
		List<Long> pickIdList = command.pickIdList();
		Folder destinationFolder = folderRepository.findById(command.destinationFolderId())
			.orElseThrow(ApiFolderException::FOLDER_NOT_FOUND);
		destinationFolder.updateChildPickOrderList(pickIdList, command.orderIdx());

		for (Long pickId : pickIdList) {
			Pick pick = getPick(pickId);
			pick.getParentFolder().removeChildPickOrder(pickId);
			pick.updateParentFolder(destinationFolder);
			log.info("pick Folder Id : {}, {}", pick.getParentFolder().getId(), destinationFolder.getId());
		}
	}

	@Override
	@Transactional
	public void deletePickList(PickCommand.Delete command) {
		List<Long> pickIdList = command.pickIdList();
		for (Long pickId : pickIdList) {
			Pick pick = getPick(pickId);
			pick.getParentFolder().removeChildPickOrder(pickId);
			pickRepository.delete(pick);
			pickTagRepository.deleteByPick(pick);
		}
	}

	@Override
	@Transactional
	public void detachTagFromPick(Pick pick, Long tagId) {
		pickTagRepository.deleteByPickAndTagId(pick, tagId);
	}

	@Override
	@Transactional
	public void detachTagFromEveryPick(Long tagId) {
		pickTagRepository.deleteByTagId(tagId);
	}

	private void updateNewTagIdList(Pick pick, List<Long> newTagOrderList) {
		pick.getTagOrderList().stream()
			.filter(tagId -> !newTagOrderList.contains(tagId))
			.forEach(tagId -> detachTagFromPick(pick, tagId));
		pick.updateTagOrderList(newTagOrderList);
	}

}

