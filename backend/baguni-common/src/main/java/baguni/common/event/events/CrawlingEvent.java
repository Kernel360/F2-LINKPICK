package baguni.common.event.events;

import lombok.Getter;

/**
 * @author sangwon
 * 픽 생성 시 해당 링크의 크롤링을 하기 위한 이벤트 클래스
 */
@Getter
public class CrawlingEvent extends Event {

	private final Long linkId;

	private final String url;

	private final String title;

	public CrawlingEvent(Long linkId, String url, String title) {
		this.linkId = linkId;
		this.url = url;
		this.title = title;
	}
}
