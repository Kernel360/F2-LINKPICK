package techpick.api.domain.chromebookmark.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChromeBookmark {

	private String title;
	private String url;

	public ChromeBookmark(String title, String url) {
		this.title = title;
		this.url = url;
	}
}
