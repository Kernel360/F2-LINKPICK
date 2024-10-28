package domain.pick;

import kernel360.techpick.core.model.pick.Pick;
import kernel360.techpick.core.model.user.User;
import kernel360.techpick.api.domain.pick.exception.ApiPickException;
import kernel360.techpick.api.infrastructure.pick.PickAdaptor;

public class FakePickAdaptor implements PickAdaptor {

	@Override
	public Pick getPick(User user, Long pickId) {
		// TODO: implement fake adaptor
		return null;
	}

	@Override
	public Pick savePick(Pick pick) throws ApiPickException {
		// TODO: implement fake adaptor
		return null;
	}

	@Override
	public void deletePick(Pick pick) {
		// TODO: implement fake adaptor
	}

	@Override
	public void detachTagFromPick(Pick pick, Long tagId) {
		// TODO: implement fake adaptor
	}

	@Override
	public void detachTagFromEveryPick(Long tagId) {
		// TODO: implement fake adaptor
	}
}
