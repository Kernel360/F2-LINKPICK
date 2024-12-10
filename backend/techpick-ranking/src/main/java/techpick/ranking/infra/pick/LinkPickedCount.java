package techpick.ranking.infra.pick;

import java.time.LocalDate;

import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;
import lombok.Getter;

/**
 * 해당 링크가 픽된 (=북마크화 된) 횟수를 날짜별로 집계합니다.
 */
@Document(collection = "link_picked_count")
@Getter
public class LinkPickedCount extends UrlCount {

	@Id
	private String id;

	public LinkPickedCount(LocalDate date, String url) {
		super(date, url);
	}
}
