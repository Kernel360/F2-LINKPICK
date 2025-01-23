package baguni.common.event.events;

import com.fasterxml.jackson.annotation.JsonCreator;

import lombok.Getter;

@Getter
public class BookmarkCreateEvent extends Event {

	private static final String TOPIC = "bookmark.create";
	private final String url;

	@JsonCreator
	public BookmarkCreateEvent(String url) {
		super(TOPIC);
		this.url = url;
	}
}
