package techpick.ranking.entity;

import java.time.LocalDate;

import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;
import lombok.Getter;

@Document(collection = "")
@Getter
public class LinkViewCount {

	@Id
	private String id;

	private final LocalDate date;

	private final String url;

	private final Long count;

	public LinkViewCount(LocalDate date, String url, Long count) {
		this.date = date;
		this.url = url;
		this.count = count;
	}
}
