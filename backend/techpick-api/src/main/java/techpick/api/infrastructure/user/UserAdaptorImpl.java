package techpick.api.infrastructure.user;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import techpick.api.domain.user.exception.ApiUserException;
import techpick.core.model.user.User;
import techpick.core.model.user.UserRepository;

@Component
@RequiredArgsConstructor
public class UserAdaptorImpl implements UserAdaptor {
	private final UserRepository userRepository;

	@Override
	@Transactional(readOnly = true)
	public User getUser(Long userId) {
		return userRepository.findById(userId).orElseThrow(ApiUserException::USER_NOT_FOUND);
	}
}
