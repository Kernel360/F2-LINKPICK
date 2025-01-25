package baguni.common.event.events;

import org.apache.commons.lang3.StringUtils;

import lombok.Getter;

@Getter
public class Topic {

	private final String topicString;

	public Topic(String topic) {
		if (StringUtils.isBlank(topic)) {
			throw new IllegalArgumentException("Topic cannot be null or empty");
		}
		if (255 < topic.getBytes().length) {
			throw new IllegalArgumentException("rabbitmq topic (routing key) 는 255 byte를 넘길 수 없습니다.");
		}
		this.topicString = topic;
	}
}
