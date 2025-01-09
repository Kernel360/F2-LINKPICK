package baguni.ranking.infra.pick;

import java.time.LocalDate;

import lombok.Getter;

@Getter
public class UrlCount {

	private final LocalDate date;

	private final String url;

	private Long count;

	public UrlCount(final LocalDate date, final String url) {
		this.count = 0L;
		this.date = date;
		this.url = url;
	}

	public void incrementCount() {
		++this.count;
	}
}
