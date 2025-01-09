package baguni.api.service.user.dto;

import baguni.entity.model.user.User;
import baguni.entity.model.util.IDToken;

public record UserInfo(
	Long id,
	String name,
	IDToken idToken,
	String email
) {
	public static UserInfo from(User user) {
		return new UserInfo(user.getId(), user.getNickname(), user.getIdToken(), user.getEmail());
	}
}
