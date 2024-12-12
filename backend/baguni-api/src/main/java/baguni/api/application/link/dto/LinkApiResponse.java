package baguni.api.application.link.dto;

import lombok.Getter;

@Getter
public class LinkApiResponse {

	private final String url;
	private final String title;
	private final String description;
	private final String imageUrl;

	public LinkApiResponse(String url, String title, String description, String imageUrl) {
		this.url = url;
		this.title = title;
		this.description = description;
		this.imageUrl = imageUrl;
	}
}

