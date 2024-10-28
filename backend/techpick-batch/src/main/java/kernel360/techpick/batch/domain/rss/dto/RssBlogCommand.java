package kernel360.techpick.batch.domain.rss.dto;

public class RssBlogCommand {

	public record Create(
		String blogName,
		String url
	) {
	}

	public record Read() {
	}

	public record Update() {
	}

	public record Delete() {
	}
}
