package kernel360.techpick.api.infrastructure.user.reader;

import kernel360.techpick.core.model.user.User;

public interface UserReader {

	User readUser(Long userId);

	User readCurrentUser();

	Long readCurrentUserId();
}
