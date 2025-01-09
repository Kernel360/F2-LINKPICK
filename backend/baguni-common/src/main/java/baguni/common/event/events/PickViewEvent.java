package baguni.common.event.events;

import lombok.Getter;

/**
 * @author minkyeu kim
 * 유저의 북마크 조회를 집계합니다.
 */
@Getter
public class PickViewEvent extends Event {

	private final Long userId;

	private final Long pickId;

	private final String url;

	public PickViewEvent(Long userId, Long pickId, String url) {
		this.userId = userId;
		this.pickId = pickId;
		this.url = url;
	}
}
