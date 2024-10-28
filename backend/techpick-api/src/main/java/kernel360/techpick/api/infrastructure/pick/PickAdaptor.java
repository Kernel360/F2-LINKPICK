package kernel360.techpick.api.infrastructure.pick;

import kernel360.techpick.core.model.pick.Pick;
import kernel360.techpick.core.model.user.User;
import kernel360.techpick.api.domain.pick.exception.ApiPickException;

public interface PickAdaptor {

	Pick getPick(User user, Long pickId);

	Pick savePick(Pick pick) throws ApiPickException;

	void deletePick(Pick pick);

	void detachTagFromPick(Pick pick, Long tagId);

	void detachTagFromEveryPick(Long tagId);
}
