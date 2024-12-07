package techpick.core.event.events;

import lombok.Getter;

/**
 * @author minkyeu kim
 * 유저들이 추가한 북마크들의 교집합을 구합니다.
 */
@Getter
public class PickCreateEvent extends Event {

	private final Long userId;

	private final Long pickId;

	private final String url;

	public PickCreateEvent(Long userId, Long pickId, String url) {
		this.userId = userId;
		this.pickId = pickId;
		this.url = url;
	}
}
