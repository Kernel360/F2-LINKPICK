package techpick.ranking.infra;

import java.time.LocalDate;

import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;
import lombok.Getter;

@Document(collection = "link_view_count")
@Getter
public class PickViewCount {

	@Id
	private String id;

	private final LocalDate date;

	private final String url;

	private Long count;

	public PickViewCount(LocalDate date, String url, Long count) {
		this.date = date;
		this.url = url;
		this.count = count;
	}

	public PickViewCount incrementCount() {
		++this.count;
		return this;
	}
}
