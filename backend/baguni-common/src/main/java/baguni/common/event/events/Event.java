package baguni.common.event.events;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import lombok.Getter;

/**
 * @author minkyeu kim
 * 메시지큐에 보내는 기본 이벤트 형식입니다.
 */
@Getter
public abstract class Event {

	private final String topic;

	/** 이벤트가 발생한 시각 */
	private final LocalDateTime time = LocalDateTime.now();

	/** 기본 포맷: yyyy-MM-dd HH:mm:ss */
	public String getTimeFormatted() {
		return time.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
	}

	public Event(String topic) {
		this.topic = topic;
	}
}
