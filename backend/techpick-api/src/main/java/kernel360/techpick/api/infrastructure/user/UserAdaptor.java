package kernel360.techpick.api.infrastructure.user;

import kernel360.techpick.core.model.user.User;

public interface UserAdaptor {

	User getUser(Long userId);
}
