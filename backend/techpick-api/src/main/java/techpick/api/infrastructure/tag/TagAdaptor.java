package techpick.api.infrastructure.tag;

import java.util.List;

import techpick.api.domain.tag.dto.TagCommand;
import techpick.core.model.tag.Tag;

public interface TagAdaptor {

	Tag getTag(Long tagId);

	List<Tag> getTagList(Long userId);

	List<Tag> getTagList(List<Long> tagOrderList);

	Tag saveTag(Long userId, TagCommand.Create command);

	Tag updateTag(TagCommand.Update command);

	List<Long> moveTag(Long userId, TagCommand.Move command);

	void deleteTag(Long userId, TagCommand.Delete command);

	boolean checkDuplicateTagName(Long userId, String name);
}
