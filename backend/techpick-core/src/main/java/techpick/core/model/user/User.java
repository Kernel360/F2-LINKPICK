package techpick.core.model.user;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import techpick.core.model.common.BaseEntity;
import techpick.core.util.OrderConverter;

@SQLDelete(sql = "UPDATE user SET deleted_at = CURRENT_TIMESTAMP WHERE user.id=?")
@SQLRestriction("deleted_at IS NULL")
@Table(name = "user")
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseEntity /* implements UserDetails --> 시큐리티 도입시 추가 */ {

	private static final String SOCIAL_USER_HAS_NO_PASSWORD = null;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	// 닉네임 (없으면 랜덤 생성 - Ex. "노래하는피치#145")
	@Column(name = "nickname") //, nullable = false /*, unique = true */)
	private String nickname;

	// 이메일 (WARN: 두 소셜 로그인이 같은 이메일을 가질 수 있음)
	@Column(name = "email", nullable = false)
	private String email;

	// 유저 권한
	@Column(name = "role", nullable = false)
	@Enumerated(EnumType.STRING)
	private Role role;

	// 비밀번호 (소셜 로그인 사용자는 null)
	@Column(name = "password") // nullable
	private String password;

	// 소셜 제공자 (null일 경우 자체 가입 회원)
	@Enumerated(EnumType.STRING)
	@Column(name = "social_provider") // nullable
	private SocialType socialProvider;

	// 소셜 제공자 Id
	@Column(name = "social_provider_id") // nullable
	private String socialProviderId;

	// Soft Delete - 삭제 시간
	@Column(name = "deleted_at") // nullable
	private LocalDateTime deletedAt;

	// 유저의 tag id들을 공백으로 분리된 String으로 변환하여 db에 저장
	// ex) [6,3,2,23,1] -> "6 3 2 23 1"
	@Convert(converter = OrderConverter.class)
	@Column(name = "tag_order", columnDefinition = "longblob", nullable = false)
	private List<Long> tagOrderList = new ArrayList<>();

	public void updateTagOrderList(List<Long> tagOrderList) {
		this.tagOrderList = tagOrderList;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (!(o instanceof User user)) {
			return false;
		}
		return Objects.equals(id, user.id);
	}

	@Override
	public int hashCode() {
		return Objects.hashCode(id);
	}

	@Builder
	private User(
		SocialType socialProvider,
		String socialProviderId,
		String nickname,
		String password,
		String email,
		Role role,
		List<Long> tagOrderList
	) {
		this.socialProviderId = socialProviderId;
		this.socialProvider = socialProvider;
		this.nickname = nickname;
		this.password = password;
		this.email = email;
		this.role = role;
		this.tagOrderList = tagOrderList;
	}

	// TODO: 엔티티 사용자가 정적 팩토리 메소드로 필요한 함수를 구현 하세요
	public static User createSocialUser(SocialType socialProvider, String socialProviderId, String email) {
		return User.builder()
			.socialProvider(socialProvider)
			.socialProviderId(socialProviderId)
			.email(email)
			.nickname("random nickname")
			.role(Role.ROLE_USER)
			.build();
	}
}
