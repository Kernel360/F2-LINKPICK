package kernel360.techpick.api.domain.tag.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kernel360.techpick.core.model.tag.Tag;
import kernel360.techpick.api.domain.tag.dto.TagCommand;
import kernel360.techpick.api.domain.tag.dto.TagMapper;
import kernel360.techpick.api.domain.tag.dto.TagResult;
import kernel360.techpick.api.domain.tag.exception.ApiTagException;
import kernel360.techpick.api.infrastructure.tag.TagAdaptor;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {

	private final TagAdaptor tagAdaptor;
	private final TagMapper tagMapper;

	@Override
	@Transactional(readOnly = true)
	public TagResult getTag(TagCommand.Read command) throws ApiTagException {
		Tag tag = tagAdaptor.getTag(command.tagId());
		validateTagAccess(command.userId(), tag);
		return tagMapper.toResult(tag);
	}

	@Override
	@Transactional(readOnly = true)
	public List<TagResult> getUserTagList(Long userId) {
		return tagAdaptor.getTagList(userId).stream()
			.map(tagMapper::toResult).toList();
	}

	@Override
	@Transactional
	public TagResult saveTag(TagCommand.Create command) {
		validateDuplicateTagName(command.userId(), command.name());

		return tagMapper.toResult(tagAdaptor.saveTag(command.userId(), command));
	}

	@Override
	@Transactional
	public TagResult updateTag(TagCommand.Update command) {
		Tag tag = tagAdaptor.getTag(command.tagId());

		validateTagAccess(command.userId(), tag);
		validateDuplicateTagName(command.userId(), command.name());

		return tagMapper.toResult(tagAdaptor.updateTag(command));
	}

	@Override
	@Transactional
	public void moveUserTag(TagCommand.Move command) {
		Tag tag = tagAdaptor.getTag(command.tagId());

		validateTagAccess(command.userId(), tag);

		tagAdaptor.moveTag(command.userId(), command);
	}

	@Override
	@Transactional
	public void deleteTag(TagCommand.Delete command) {
		Tag tag = tagAdaptor.getTag(command.tagId());

		validateTagAccess(command.userId(), tag);

		tagAdaptor.deleteTag(command.userId(), command);
	}

	private void validateTagAccess(Long userId, Tag tag) {
		if (!userId.equals(tag.getUser().getId())) {
			throw ApiTagException.UNAUTHORIZED_TAG_ACCESS();
		}
	}

	private void validateDuplicateTagName(Long userId, String name) {
		if (tagAdaptor.checkDuplicateTagName(userId, name)) {
			throw ApiTagException.TAG_ALREADY_EXIST();
		}
	}
}
