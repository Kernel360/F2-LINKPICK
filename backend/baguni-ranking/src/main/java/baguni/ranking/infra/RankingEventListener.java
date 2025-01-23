package baguni.ranking.infra;

import java.time.LocalDate;

import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import baguni.common.config.RabbitmqConfig;
import baguni.common.event.events.LinkReadEvent;
import baguni.common.event.events.PickCreateEvent;
import baguni.ranking.infra.pick.LinkPickedCount;
import baguni.ranking.infra.pick.LinkPickedCountRepository;
import baguni.ranking.infra.pick.LinkViewCount;
import baguni.ranking.infra.pick.LinkViewCountRepository;

/**
 * @author minkyeu kim
 * RabbitMq Queue(PICK_RANKING) 에 들어오는 대로
 * 즉시 꺼내 집계에 반영하는 소비자 컴포넌트
 * */
@Slf4j
@Component
@RequiredArgsConstructor
@RabbitListener(queues = {RabbitmqConfig.QUEUE.PICK_RANKING})
public class RankingEventListener {

	private final LinkViewCountRepository linkViewCountRepository;
	private final LinkPickedCountRepository linkPickedCountRepository;

	/**
	 * 사용자의 북마크 생성 이벤트 집계
	 */
	@RabbitHandler
	public void pickCreateEvent(PickCreateEvent event) {
		log.info("픽 생성 이벤트 수신 {}", event);
		var date = event.getTime().toLocalDate();
		var url = event.getUrl();
		updateLinkPickedCount(date, url);
	}

	/**
	 * 사용자의 북마크 조회 이벤트 집계
	 */
	@RabbitHandler
	public void linkViewEvent(LinkReadEvent event) {
		log.info("링크 조회 이벤트 수신 {}", event);
		var date = event.getTime().toLocalDate();
		var url = event.getUrl();
		updateLinkViewCount(date, url);
	}

	/**
	 * 매핑되지 않은 이벤트
	 */
	@RabbitHandler(isDefault = true)
	public void defaultMethod(Object object) {
		log.error("일치하는 이벤트 타입이 없습니다! {}", object.toString());
	}

	/**
	 * 헬퍼 함수
	 * TODO: 다른 클래스나 서비스로 분리 리팩토링 진행
	 */
	private void updateLinkViewCount(LocalDate date, String url) {
		var linkViewCount = linkViewCountRepository
			.findLinkViewCountByDateAndUrl(date, url)
			.orElseGet(() -> new LinkViewCount(date, url));
		linkViewCount.incrementCount();
		linkViewCountRepository.save(linkViewCount);
	}

	private void updateLinkPickedCount(LocalDate date, String url) {
		var linkPickedCount = linkPickedCountRepository
			.findLinkPickedCountByDateAndUrl(date, url)
			.orElseGet(() -> new LinkPickedCount(date, url));
		linkPickedCount.incrementCount();
		linkPickedCountRepository.save(linkPickedCount);
	}
}
