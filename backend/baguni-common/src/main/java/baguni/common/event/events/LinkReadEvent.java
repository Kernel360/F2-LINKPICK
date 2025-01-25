package baguni.common.event.events;

import com.fasterxml.jackson.annotation.JsonCreator;

import lombok.Getter;

/**
 * DB의 맄그 가 조회(Read) 됨을 의미하는 메시지.
 */
public class LinkReadEvent extends UrlEvent {

	private static final Topic topic = new Topic("link.read");

	@JsonCreator
	public LinkReadEvent(String url) {
		super(topic, url);
	}
}
