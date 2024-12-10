package techpick.core.event.events;

import lombok.Getter;

/**
 * @author minkyeu kim
 * 유저의 북마크 조회를 집계합니다.
 */
@Getter
public class SuggestionViewEvent extends Event {

	private final Long userId;

	private final String url;

	public SuggestionViewEvent(Long userId, String url) {
		this.userId = userId;
		this.url = url;
	}
}
