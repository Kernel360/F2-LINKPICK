package techpick.api.domain.tag.service;

import java.util.List;

import techpick.api.domain.tag.dto.TagCommand;
import techpick.api.domain.tag.dto.TagResult;

public interface TagService {

	TagResult getTag(TagCommand.Read command);

	List<TagResult> getUserTagList(Long userId);

	TagResult saveTag(TagCommand.Create command);

	TagResult updateTag(TagCommand.Update command);

	void moveUserTag(TagCommand.Move command);

	void deleteTag(TagCommand.Delete command);
}
