package techpick.core.event.events;

import lombok.Getter;

/**
 * @author minkyeu kim
 * 유저들이 추가한 북마크들의 교집합을 구합니다.
 */
@Getter
public class PickCreateEvent extends Event {

	// 사용자 정보
	private final Long userId;

	// 북마크한 대상 url
	private final String url;

	public PickCreateEvent(Long userId, String url) {
		super(EventType.USER_PICK_CREATE);
		this.userId = userId;
		this.url = url;
	}

	@Override
	public String toString() {
		return "PickCreateEvent{" +
			"userId=" + userId +
			", url='" + url + '\'' +
			'}';
	}
}
