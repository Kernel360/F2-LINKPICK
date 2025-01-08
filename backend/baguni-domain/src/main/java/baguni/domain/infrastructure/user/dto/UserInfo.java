package baguni.domain.infrastructure.user.dto;

import baguni.domain.model.user.User;

public record UserInfo(
	Long id,
	String name,
	String email
) {
	public static UserInfo from(User user) {
		return new UserInfo(user.getId(), user.getNickname(), user.getEmail());
	}
}
