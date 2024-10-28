package kernel360.techpick.api.infrastructure.user.reader;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import kernel360.techpick.core.model.user.User;
import kernel360.techpick.core.model.user.UserRepository;
import kernel360.techpick.api.domain.user.exception.ApiUserException;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UserReaderImpl implements UserReader {
	private final UserRepository userRepository;

	@Override
	public User readUser(Long userId) {
		return userRepository.findById(userId).orElseThrow(ApiUserException::USER_NOT_FOUND);
	}

	@Override
	public User readCurrentUser() {
		var authentication = SecurityContextHolder.getContext().getAuthentication();
		long userId = (long)authentication.getPrincipal();
		return userRepository.findById(userId).orElseThrow(ApiUserException::USER_NOT_FOUND);
	}

	@Override
	public Long readCurrentUserId() {
		var authentication = SecurityContextHolder.getContext().getAuthentication();
		return (long)authentication.getPrincipal();
	}
}
