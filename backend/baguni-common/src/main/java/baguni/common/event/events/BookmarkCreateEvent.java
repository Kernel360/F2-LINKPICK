package baguni.common.event.events;

import com.fasterxml.jackson.annotation.JsonCreator;

/**
 * DB의 북마크(픽) 가 생성됨을 의미하는 메시지.
 */
public class BookmarkCreateEvent extends UrlEvent {

	private static final Topic topic = new Topic("bookmark.create");

	@JsonCreator
	public BookmarkCreateEvent(String url) {
		super(topic, url);
	}
}
