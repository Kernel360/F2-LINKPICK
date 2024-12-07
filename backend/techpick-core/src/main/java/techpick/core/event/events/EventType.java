package techpick.core.event.events;

/**
 * @author minkyeu kim
 * 이벤트가 북마크 생성인지, 사이트 조회인지 등을 판단하기 위한 ENUM.
 * PRODUCER 쪽에서 해당 이벤트의 성격을 판단해야 합니다.
 */
public enum EventType {
	/**
	 * DOMAIN: PICK
	 */
	USER_PICK_CREATE,        // 사용자의 북마크 생성
	USER_PICK_VIEW,          // 사용자의 북마크 클릭 (조회)
	/**
	 * DOMAIN: SHARED_FOLDER
	 */
	SHARED_FOLDER_LINK_VIEW, // 공개된 폴더의 링크 조회
}