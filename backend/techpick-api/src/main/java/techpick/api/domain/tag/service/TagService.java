package techpick.api.domain.tag.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import techpick.api.domain.tag.dto.TagCommand;
import techpick.api.domain.tag.dto.TagMapper;
import techpick.api.domain.tag.dto.TagResult;
import techpick.api.domain.tag.exception.ApiTagException;
import techpick.api.infrastructure.tag.TagDataHandler;
import techpick.core.model.tag.Tag;

@Service
@RequiredArgsConstructor
public class TagService {

	private final TagDataHandler tagDataHandler;
	private final TagMapper tagMapper;

	@Transactional(readOnly = true)
	public TagResult getTag(TagCommand.Read command) throws ApiTagException {
		Tag tag = tagDataHandler.getTag(command.id());
		validateTagAccess(command.userId(), tag);
		return tagMapper.toResult(tag);
	}

	@Transactional(readOnly = true)
	public List<TagResult> getUserTagList(Long userId) {
		return tagDataHandler.getTagList(userId).stream()
			.map(tagMapper::toResult).toList();
	}

	@Transactional
	public TagResult saveTag(TagCommand.Create command) {
		validateDuplicateTagName(command.userId(), command.name());
		return tagMapper.toResult(tagDataHandler.saveTag(command.userId(), command));
	}

	@Transactional
	public TagResult updateTag(TagCommand.Update command) {
		Tag tag = tagDataHandler.getTag(command.id());

		validateTagAccess(command.userId(), tag);
		validateDuplicateTagName(command.userId(), command.name());

		return tagMapper.toResult(tagDataHandler.updateTag(command));
	}

	@Transactional
	public void moveUserTag(TagCommand.Move command) {
		Tag tag = tagDataHandler.getTag(command.id());

		validateTagAccess(command.userId(), tag);

		tagDataHandler.moveTag(command.userId(), command);
	}

	@Transactional
	public void deleteTag(TagCommand.Delete command) {
		Tag tag = tagDataHandler.getTag(command.id());

		validateTagAccess(command.userId(), tag);

		tagDataHandler.deleteTag(command.userId(), command);
	}

	private void validateTagAccess(Long userId, Tag tag) {
		if (!userId.equals(tag.getUser().getId())) {
			throw ApiTagException.UNAUTHORIZED_TAG_ACCESS();
		}
	}

	private void validateDuplicateTagName(Long userId, String name) {
		if (tagDataHandler.checkDuplicateTagName(userId, name)) {
			throw ApiTagException.TAG_ALREADY_EXIST();
		}
	}
}
