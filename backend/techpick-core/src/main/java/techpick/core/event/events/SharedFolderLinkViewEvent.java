package techpick.core.event.events;

import lombok.Getter;
import lombok.ToString;

/**
 * @author minkyeu kim
 * 공개된 폴더의 링크 조회 현황 추적
 */
@Getter
public class SharedFolderLinkViewEvent extends Event {

	// 북마크한 대상 url
	private final String url;

	// 공개 폴더 조회 토큰
	private final String folderAccessToken;

	public SharedFolderLinkViewEvent(String url, String folderAccessToken) {
		super(EventType.SHARED_FOLDER_LINK_VIEW);
		this.url = url;
		this.folderAccessToken = folderAccessToken;
	}

	@Override
	public String toString() {
		return "SharedFolderLinkViewEvent{" +
			"url='" + url + '\'' +
			", folderAccessToken='" + folderAccessToken + '\'' +
			'}';
	}
}
