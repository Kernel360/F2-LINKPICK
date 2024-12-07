package techpick.core.event.events;

import lombok.Getter;
import lombok.ToString;

/**
 * @author minkyeu kim
 * 공개된 폴더의 링크 조회 현황 추적
 */
@Getter
public class SharedFolderLinkViewEvent extends Event {

	private final String url;

	private final String folderAccessToken;

	public SharedFolderLinkViewEvent(String url, String folderAccessToken) {
		this.url = url;
		this.folderAccessToken = folderAccessToken;
	}
}
