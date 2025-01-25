package baguni.common.event.events;

import com.fasterxml.jackson.annotation.JsonCreator;

import lombok.Getter;

/**
 * DB의 맄그 가 생성(Create) 됨을 의미하는 메시지.
 */
@Getter
public class LinkCreateEvent extends UrlEvent {

	private static final Topic topic = new Topic("link.create");

	@JsonCreator
	public LinkCreateEvent(String url) {
		super(topic, url);
	}
}
