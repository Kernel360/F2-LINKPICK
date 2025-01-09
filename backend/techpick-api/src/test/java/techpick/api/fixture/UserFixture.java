package techpick.api.fixture;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.Builder;
import lombok.Getter;
import techpick.core.model.user.Role;
import techpick.core.model.user.SocialType;
import techpick.core.model.user.User;

@Builder
@Getter
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserFixture {

	private Long id;

	private String nickname;

	private String email;

	private Role role;

	private String password;

	private SocialType socialProvider;

	private String socialProviderId;

	private LocalDateTime deletedAt;

	private List<Long> tagOrderList;

	private LocalDateTime createdAt;

	private LocalDateTime updatedAt;

	public User get() {
		if (tagOrderList == null) {
			tagOrderList = new ArrayList<>();
		}
		ObjectMapper mapper = new ObjectMapper();
		return mapper.convertValue(this, User.class);
	}
}
