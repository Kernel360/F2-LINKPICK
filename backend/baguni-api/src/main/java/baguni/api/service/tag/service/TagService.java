package baguni.api.service.tag.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import baguni.domain.annotation.LoginUserIdDistributedLock;
import baguni.domain.infrastructure.tag.dto.TagCommand;
import baguni.domain.infrastructure.tag.dto.TagMapper;
import baguni.domain.infrastructure.tag.dto.TagResult;
import baguni.domain.exception.tag.ApiTagException;
import baguni.domain.infrastructure.tag.TagDataHandler;
import baguni.domain.model.tag.Tag;

@Service
@RequiredArgsConstructor
public class TagService {

	private final TagDataHandler tagDataHandler;
	private final TagMapper tagMapper;

	@Transactional(readOnly = true)
	public TagResult getTag(TagCommand.Read command) throws ApiTagException {
		Tag tag = tagDataHandler.getTag(command.id());
		assertUserIsTagOwner(command.userId(), tag);
		return tagMapper.toResult(tag);
	}

	@Transactional(readOnly = true)
	public List<TagResult> getUserTagList(Long userId) {
		return tagDataHandler.getTagList(userId).stream()
							 .map(tagMapper::toResult).toList();
	}

	@LoginUserIdDistributedLock
	@Transactional
	public TagResult saveTag(TagCommand.Create command) {
		assertTagNameIsUnique(command.userId(), command.name());
		return tagMapper.toResult(tagDataHandler.saveTag(command.userId(), command));
	}

	@Transactional
	public TagResult updateTag(TagCommand.Update command) {
		Tag tag = tagDataHandler.getTag(command.id());
		assertUserIsTagOwner(command.userId(), tag);
		assertTagNameIsUnique(command.userId(), command.name());
		return tagMapper.toResult(tagDataHandler.updateTag(command));
	}

	@LoginUserIdDistributedLock
	@Transactional
	public void moveUserTag(TagCommand.Move command) {
		Tag tag = tagDataHandler.getTag(command.id());
		assertUserIsTagOwner(command.userId(), tag);
		tagDataHandler.moveTag(command.userId(), command);
	}

	@LoginUserIdDistributedLock
	@Transactional
	public void deleteTag(TagCommand.Delete command) {
		Tag tag = tagDataHandler.getTag(command.id());
		assertUserIsTagOwner(command.userId(), tag);
		tagDataHandler.deleteTag(command.userId(), command);
	}

	private void assertUserIsTagOwner(Long userId, Tag tag) {
		if (!userId.equals(tag.getUser().getId())) {
			throw ApiTagException.UNAUTHORIZED_TAG_ACCESS();
		}
	}

	private void assertTagNameIsUnique(Long userId, String name) {
		if (tagDataHandler.checkDuplicateTagName(userId, name)) {
			throw ApiTagException.TAG_ALREADY_EXIST();
		}
	}
}
