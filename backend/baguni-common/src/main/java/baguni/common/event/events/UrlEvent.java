package baguni.common.event.events;

import com.fasterxml.jackson.annotation.JsonCreator;

import lombok.Getter;

@Getter
public abstract class UrlEvent extends Event {
	private final String url;

	@JsonCreator
	public UrlEvent(Topic topic, String url) {
		super(topic);
		this.url = url;
	}
}
