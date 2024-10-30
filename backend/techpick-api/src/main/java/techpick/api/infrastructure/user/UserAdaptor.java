package techpick.api.infrastructure.user;

import techpick.core.model.user.User;

public interface UserAdaptor {

	User getUser(Long userId);
}
