package kernel360.techpick.core.model.link;

import java.time.LocalDateTime;

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
public class Link {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	// URL
	// TODO: VARCHAR 최대 크기를 몇으로 할지 토의 필요합니다.
	// 		 The index key prefix length limit is 3072 bytes for InnoDB -> VARCHAR(1000) + utf8 = 4000byte
	//       일단 medium 기준 가장 길었던 url 320 글자의 약 2배인 VARCHAR(600)으로 변경
	//       Techpick 노션 기술 부채에 VARCHAR, TEXT 부분 참고.
	@Column(name = "url", nullable = false, columnDefinition = "VARCHAR(600)", unique = true)
	private String url;

	@Column(name = "title", columnDefinition = "VARCHAR(100)")
	private String title;

	@Column(name = "description", columnDefinition = "VARCHAR(600)")
	private String description;

	@Column(name = "imageUrl", columnDefinition = "VARCHAR(600)")
	private String imageUrl;

	@Column(name = "invalidatedAt_at")
	private LocalDateTime invalidatedAt;

	public Link updateMetadata(String title, String description, String imageUrl) {
		this.title = title;
		this.description = description;
		this.imageUrl = imageUrl;
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
