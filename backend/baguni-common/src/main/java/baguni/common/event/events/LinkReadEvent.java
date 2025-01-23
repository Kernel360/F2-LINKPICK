package baguni.common.event.events;

import com.fasterxml.jackson.annotation.JsonCreator;

import lombok.Getter;

@Getter
public class LinkReadEvent extends Event {

	private static final String TOPIC = "link.read";
	private final String url;

	@JsonCreator
	public LinkReadEvent(String url) {
		super(TOPIC);
		this.url = url;
	}
}
