package kernel360.techpick.api.infrastructure.tag;

import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import kernel360.techpick.core.model.pick.PickRepository;
import kernel360.techpick.core.model.pick.PickTagRepository;
import kernel360.techpick.core.model.tag.Tag;
import kernel360.techpick.core.model.tag.TagRepository;
import kernel360.techpick.core.model.user.User;
import kernel360.techpick.core.model.user.UserRepository;
import kernel360.techpick.api.domain.tag.dto.TagCommand;
import kernel360.techpick.api.domain.tag.dto.TagMapper;
import kernel360.techpick.api.domain.tag.exception.ApiTagException;
import kernel360.techpick.api.domain.user.exception.ApiUserException;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class TagAdaptorImpl implements TagAdaptor {

	private final TagRepository tagRepository;
	private final PickRepository pickRepository;
	private final PickTagRepository pickTagRepository;
	private final UserRepository userRepository;
	private final TagMapper tagMapper;

	@Override
	@Transactional(readOnly = true)
	public Tag getTag(Long tagId) {
		return tagRepository.findById(tagId).orElseThrow(ApiTagException::TAG_NOT_FOUND);
	}

	@Override
	@Transactional(readOnly = true)
	public List<Tag> getTagList(Long userId) {
		return tagRepository.findAllByUserId(userId);
	}

	@Override
	public List<Tag> getTagList(List<Long> tagOrderList) {
		return tagRepository.findAllById(tagOrderList);
	}

	@Override
	@Transactional
	public Tag saveTag(Long userId, TagCommand.Create command) {
		User user = userRepository.findById(userId).orElseThrow(ApiUserException::USER_NOT_FOUND);
		Tag tag = tagRepository.save(tagMapper.toEntity(command, user));
		user.getTagOrderList().add(tag.getId());
		return tag;
	}

	@Override
	@Transactional
	public Tag updateTag(TagCommand.Update command) {
		Tag tag = tagRepository.findById(command.tagId()).orElseThrow(ApiTagException::TAG_NOT_FOUND);
		tag.updateTagName(command.name());
		tag.updateColorNumber(command.colorNumber());
		return tag;
	}

	@Override
	@Transactional
	public List<Long> moveTag(Long userId, TagCommand.Move command) {
		User user = userRepository.findById(userId).orElseThrow(ApiUserException::USER_NOT_FOUND);
		var userTagOrder = user.getTagOrderList();
		userTagOrder.remove(command.tagId());
		userTagOrder.add(command.orderIdx(), command.tagId());
		return userTagOrder;
	}

	@Override
	@Transactional
	public void deleteTag(Long userId, TagCommand.Delete command) {
		User user = userRepository.findById(userId).orElseThrow(ApiUserException::USER_NOT_FOUND);
		Long tagId = command.tagId();
		user.getTagOrderList().remove(tagId);
		pickTagRepository.findAllByTagId(tagId).stream()
			.map(pickTag -> pickRepository.findById(pickTag.getPick().getId())
				.orElseThrow(ApiTagException::TAG_NOT_FOUND))
			.forEach(pick -> pick.getTagOrderList().remove(pick.getId()));
		pickTagRepository.deleteById(tagId);
		tagRepository.deleteById(tagId);
	}

	@Override
	@Transactional(readOnly = true)
	public boolean checkDuplicateTagName(Long userId, String name) {
		return tagRepository.existsByUserIdAndName(userId, name);
	}
}
