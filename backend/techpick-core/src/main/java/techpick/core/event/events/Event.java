package techpick.core.event.events;

import java.time.LocalDateTime;

import lombok.Getter;

/**
 * @author minkyeu kim
 * 메시지큐에 보내는 기본 이벤트 형식입니다.
 */
@Getter
public abstract class Event {

	/** 이벤트가 발생한 시각 */
	private final LocalDateTime time = LocalDateTime.now();

	/** Consumer에서 단일 큐로 넘어온 이벤트들을, type 별로 구분하여 집계합니다. */
	private final EventType type;

	public Event(EventType type) {
		this.type = type;
	}
}
