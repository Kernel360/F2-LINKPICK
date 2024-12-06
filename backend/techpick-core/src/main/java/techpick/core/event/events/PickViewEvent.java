package techpick.core.event.events;

import lombok.Getter;

/**
 * @author minkyeu kim
 * 유저의 북마크 조회를 집계합니다.
 */
@Getter
public class PickViewEvent extends Event {

	// 사용자 정보
	private final Long userId;

	// 북마크 대상 url
	private final String url;

	public PickViewEvent(Long userId, String url) {
		super(EventType.USER_PICK_VIEW);
		this.userId = userId;
		this.url = url;
	}

	@Override
	public String toString() {
		return "PickViewEvent{" +
			"userId=" + userId +
			", url='" + url + '\'' +
			'}';
	}
}
