package baguni.domain.model.link;

import java.time.LocalDateTime;

import org.apache.commons.lang3.StringUtils;

import baguni.domain.model.common.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "link")
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Link extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	// URL
	// TODO: VARCHAR 최대 크기를 몇으로 할지 토의 필요합니다.
	// 		 The index key prefix length limit is 3072 bytes for InnoDB -> VARCHAR(1000) + utf8 = 4000byte
	//       일단 medium 기준 가장 길었던 url 320 글자의 약 2배인 VARCHAR(600)으로 변경
	//       Baguni 노션 기술 부채에 VARCHAR, TEXT 부분 참고.
	@Column(name = "url", nullable = false, columnDefinition = "VARCHAR(600)", unique = true)
	private String url;

	// title이 한글 200자 이상인 경우가 있어 text타입으로 변경
	@Column(name = "title", columnDefinition = "TEXT")
	private String title;

	// description이 한글 300자 이상인 경우가 있어 text타입으로 변경
	@Column(name = "description", columnDefinition = "TEXT")
	private String description;

	// image가 base64 로 인코딩되서 url에 담기는 경우가 있기 때문에 text로 변경
	@Column(name = "image_url", columnDefinition = "TEXT")
	private String imageUrl;

	@Column(name = "invalidated_at")
	private LocalDateTime invalidatedAt;

	public static Link createLinkByUrl(String url) {
		return new Link(url, "", "", "", null);
	}

	/**
	 * 익스텐션으로 픽 생성 시 항상 title을 받기 때문에 생성 메서드 추가
	 */
	public static Link createLinkByUrlAndTitle(String url, String title) {
		return new Link(url, title, "", "", null);
	}

	// null 값이 아닌 필드만 업데이트
	// 이미 값이 있으면 업데이트하지 않음.
	public Link updateMetadata(String title, String description, String imageUrl) {
		if (StringUtils.isEmpty(this.title)) {
			this.title = title;
		}
		if (StringUtils.isEmpty(this.description)) {
			this.description = description;
		}
		if (StringUtils.isEmpty(this.imageUrl)) {
			this.imageUrl = imageUrl;
		}
		return this;
	}

	public Link markAsInvalid() {
		this.invalidatedAt = LocalDateTime.now();
		return this;
	}

	public boolean isValidLink() {
		return (this.invalidatedAt == null);
	}

	@Builder
	private Link(String url, String title, String description, String imageUrl, LocalDateTime invalidatedAt) {
		this.url = url;
		this.title = title;
		this.description = description;
		this.imageUrl = imageUrl;
		this.invalidatedAt = invalidatedAt;
	}
}
