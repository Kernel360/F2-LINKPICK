package techpick.core.rabbitmq;

import java.time.LocalDateTime;

import lombok.Getter;

/**
 * @author minkyeu kim
 * 메시지큐에 보내는 이벤트 형식입니다.
 * 유저들이 북마크한 사이트들의 교집합을 구합니다.
 */
@Getter
public class Event {

    /**
     * 이벤트가 발생한 시각 */
    private final LocalDateTime occuredOn = LocalDateTime.now();

    /**
     * 북마크 추가 / 조회 대상 url */
    private final String url;

    /**
     * 북마크 조회 / 생성 / 삭제 / 수정 */
    private final EventType eventType;

    public Event(String url, EventType eventType) {
        this.url = url;
        this.eventType = eventType;
    }
}
