package kernel360.techpick.core.model.rss;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import kernel360.techpick.core.model.common.BaseEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "rss_blog")
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RssBlog extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@Column(name = "blog_name", nullable = false, unique = true)
	private String blogName;

	// Rss 피드 주소
	@Column(name = "url", nullable = false, unique = true)
	private String url;

	// TODO: 엔티티 사용자가 정적 팩토리 메소드로 필요한 함수를 구현 하세요
	@Builder
	private RssBlog(String blogName, String url) {
		this.blogName = blogName;
		this.url = url;
	}

	public static RssBlog create(String blogName, String url) {
		return new RssBlog(blogName, url);
	}
}
