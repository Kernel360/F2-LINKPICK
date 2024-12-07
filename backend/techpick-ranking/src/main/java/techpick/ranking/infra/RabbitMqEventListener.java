package techpick.ranking.infra;

import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import techpick.core.config.RabbitmqConfig;
import techpick.core.event.events.PickViewEvent;
import techpick.core.event.events.PickCreateEvent;
import techpick.core.event.events.SharedFolderLinkViewEvent;

/**
 * @author minkyeu kim
 * RabbitMq Queue(Q1) 에 들어오는 대로
 * 즉시 꺼내 집계에 반영하는 소비자 컴포넌트
 * */
@Slf4j
@Component
@RequiredArgsConstructor
@RabbitListener(queues = {RabbitmqConfig.QUEUE.Q1})
public class RabbitMqEventListener {

	private final PickViewCountRepository pickViewCountRepository;

	/**
	 * 사용자의 북마크 이벤트 집계
	 * TODO: 정상적인 생성인지 검증하는 로직 추가
	 * */
	@RabbitHandler
	public void pickCreateEvent(PickCreateEvent event) {
		var date = event.getTime().toLocalDate();
		var url = event.getUrl();
		var pickId = event.getPickId();
		var userId = event.getUserId();
		log.info("픽 생성 이벤트 : url={}, pickId={}, userId={}", url, pickId, userId);

		// TODO: 여기에 집계 로직 구현
	}

	/**
	 * 사용자의 북마크 이벤트 집계
	 * TODO: 운영 DB에 있는 링크인지 검증하는 로직 추가
	 * */
	@RabbitHandler
	public void pickViewEvent(PickViewEvent event) {
		Long INITIAL_COUNT = 0L;
		var date = event.getTime().toLocalDate();
		var url = event.getUrl();
		var pickId = event.getPickId();
		var userId = event.getUserId();
		log.info("픽 조회 이벤트 : url={}, pickId={}, userId={}", url, pickId, userId);

		// 링크에 대한 날별 집게
		var linkViewCount = pickViewCountRepository
			.findLinkViewCountByDateAndUrl(date, url)
			.orElseGet(() -> new PickViewCount(date, url, INITIAL_COUNT))
			.incrementCount();
		pickViewCountRepository.save(linkViewCount);
	}

	/**
	 * 공개 폴더 이벤트 집계
	 * TODO: 정상적인 공개 폴더인지 검증하는 로직 추가
	 * */
	@RabbitHandler
	public void sharedFolderViewEvent(SharedFolderLinkViewEvent event) {
		var date = event.getTime().toLocalDate();
		var url = event.getUrl();
		var folderAccessToken = event.getFolderAccessToken();
		log.info("공개 폴더 픽 조회 이벤트 : url={}, folder={}", url, folderAccessToken);
		// TODO: 여기에 집계 로직 구현
	}

	/**
	 * 매핑되지 않은 이벤트
	 * */
	@RabbitHandler(isDefault = true)
	public void defaultMethod(Object object) {
		log.error("일치하는 이벤트 타입이 없습니다! {}", object.toString());
	}
}
