package baguni.api.infrastructure.user;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import baguni.api.domain.user.exception.ApiUserException;
import baguni.core.model.user.User;
import baguni.core.model.user.UserRepository;

@Component
@RequiredArgsConstructor
public class UserDataHandler {
	private final UserRepository userRepository;

	@Transactional(readOnly = true)
	public User getUser(Long userId) {
		return userRepository.findById(userId).orElseThrow(ApiUserException::USER_NOT_FOUND);
	}
}
