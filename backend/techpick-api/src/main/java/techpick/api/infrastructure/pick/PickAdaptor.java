package techpick.api.infrastructure.pick;

import java.util.List;

import techpick.api.domain.pick.dto.PickCommand;
import techpick.api.domain.pick.exception.ApiPickException;
import techpick.core.model.pick.Pick;
import techpick.core.model.pick.PickTag;
import techpick.core.model.tag.Tag;

public interface PickAdaptor {

	Pick getPick(Long pickId);

	Pick getPickUrl(Long userId, String url);

	List<Pick> getPickList(List<Long> idList);

	List<PickTag> getPickTagList(Long pickId);

	Pick savePick(PickCommand.Create command) throws ApiPickException;

	PickTag savePickTag(Pick pick, Tag tag);

	Pick updatePick(PickCommand.Update command);

	void movePickToCurrentFolder(PickCommand.Move command);

	void movePickToOtherFolder(PickCommand.Move command);

	void deletePickList(PickCommand.Delete command);

	void detachTagFromPick(Pick pick, Long tagId);

	void detachTagFromEveryPick(Long tagId);
}
