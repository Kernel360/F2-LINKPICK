package techpick.ranking.infra.pick;

import java.time.LocalDate;

import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;
import lombok.Getter;

/**
 * 해당 링크가 조회된 횟수를 날짜별로 집계합니다.
 */
@Document(collection = "link_view_count")
@Getter
public class LinkViewCount extends UrlCount {

	@Id
	private String id;

	public LinkViewCount(LocalDate date, String url) {
		super(date, url);
	}
}
