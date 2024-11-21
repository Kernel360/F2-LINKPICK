package techpick.api.infrastructure.tag;

import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import techpick.api.domain.tag.dto.TagCommand;
import techpick.api.domain.tag.dto.TagMapper;
import techpick.api.domain.tag.exception.ApiTagException;
import techpick.api.domain.user.exception.ApiUserException;
import techpick.core.model.pick.PickRepository;
import techpick.core.model.pick.PickTagRepository;
import techpick.core.model.tag.Tag;
import techpick.core.model.tag.TagRepository;
import techpick.core.model.user.User;
import techpick.core.model.user.UserRepository;

@Slf4j
@Component
@RequiredArgsConstructor
public class TagDataHandler {

	private final TagRepository tagRepository;
	private final PickRepository pickRepository;
	private final PickTagRepository pickTagRepository;
	private final UserRepository userRepository;
	private final TagMapper tagMapper;

	@Transactional(readOnly = true)
	public Tag getTag(Long tagId) {
		return tagRepository.findById(tagId).orElseThrow(ApiTagException::TAG_NOT_FOUND);
	}

	@Transactional(readOnly = true)
	public List<Tag> getTagList(Long userId) {
		User user = userRepository.findById(userId).orElseThrow(ApiUserException::USER_NOT_FOUND);
		List<Long> tagOrderList = user.getTagOrderList();
		List<Tag> tagList = tagRepository.findAllByUserId(userId);
		tagList.sort(Comparator.comparing(tag -> tagOrderList.indexOf(tag.getId())));

		return tagList;
	}

	@Transactional(readOnly = true)
	public List<Tag> getTagList(List<Long> tagOrderList) {
		List<Tag> tagList = tagRepository.findAllById(tagOrderList);
		// 조회리스트에 존재하지 않는 태그id가 존재하면 예외 발생
		if (tagList.size() != tagOrderList.size()) {
			throw ApiTagException.TAG_NOT_FOUND();
		}
		return tagList;
	}

	@Transactional
	public Tag saveTag(Long userId, TagCommand.Create command) {
		User user = userRepository.findById(userId).orElseThrow(ApiUserException::USER_NOT_FOUND);
		Tag tag = tagRepository.save(tagMapper.toEntity(command, user));
		user.getTagOrderList().add(tag.getId());
		return tag;
	}

	@Transactional
	public Tag updateTag(TagCommand.Update command) {
		log.info("TagDataHandler: tag id={}", command.id()); // for debug
		Tag tag = tagRepository.findById(command.id()).orElseThrow(ApiTagException::TAG_NOT_FOUND);
		tag.updateTagName(command.name());
		tag.updateColorNumber(command.colorNumber());
		return tag;
	}

	@Transactional
	public void moveTag(Long userId, TagCommand.Move command) {
		User user = userRepository.findById(userId).orElseThrow(ApiUserException::USER_NOT_FOUND);
		user.updateTagOrderList(command.id(), command.orderIdx());
	}

	@Transactional
	public void deleteTag(Long userId, TagCommand.Delete command) {
		User user = userRepository.findById(userId).orElseThrow(ApiUserException::USER_NOT_FOUND);
		Long tagId = command.id();
		user.getTagOrderList().remove(tagId);
		pickTagRepository.findAllByTagId(tagId).stream()
			.map(pickTag -> pickRepository.findById(pickTag.getPick().getId())
				.orElseThrow(ApiTagException::TAG_NOT_FOUND))
			.forEach(pick -> {
				pick.getTagIdOrderedList().remove(tagId);
			});
		pickTagRepository.deleteByTagId(tagId);
		tagRepository.deleteById(tagId);
	}

	@Transactional(readOnly = true)
	public boolean checkDuplicateTagName(Long userId, String name) {
		return tagRepository.existsByUserIdAndName(userId, name);
	}
}
