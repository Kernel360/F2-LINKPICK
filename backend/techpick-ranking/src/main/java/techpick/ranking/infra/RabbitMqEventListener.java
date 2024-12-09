package techpick.ranking.infra;

import java.time.LocalDate;

import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import techpick.core.config.RabbitmqConfig;
import techpick.core.event.events.PickViewEvent;
import techpick.core.event.events.PickCreateEvent;
import techpick.core.event.events.SharedFolderLinkViewEvent;
import techpick.ranking.infra.pick.PickCreateCount;
import techpick.ranking.infra.pick.PickCreateCountRepository;
import techpick.ranking.infra.pick.PickViewCount;
import techpick.ranking.infra.pick.PickViewCountRepository;
import techpick.ranking.infra.sharedFolder.SharedFolderPickViewCount;
import techpick.ranking.infra.sharedFolder.SharedFolderPickViewCountRepository;

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

	private final PickCreateCountRepository pickCreateCountRepository;
	private final PickViewCountRepository pickViewCountRepository;
	private final SharedFolderPickViewCountRepository sharedFolderPickViewCountRepository;

	/**
	 * 사용자의 북마크 생성 이벤트 집계
	 * TODO: 정상적인 생성인지 검증하는 로직 추가
	 */
	@RabbitHandler
	public void pickCreateEvent(PickCreateEvent event) {
		var date = event.getTime().toLocalDate();
		var url = event.getUrl();
		var pickId = event.getPickId();
		var userId = event.getUserId();
		log.info("픽 생성 이벤트 : url={}, pickId={}, userId={}", url, pickId, userId);
		updateLinkPickedCount(date, url);
	}

	/**
	 * 사용자의 북마크 조회 이벤트 집계
	 * TODO: 운영 DB에 있는 링크인지 검증하는 로직 추가
	 */
	@RabbitHandler
	public void pickViewEvent(PickViewEvent event) {
		var date = event.getTime().toLocalDate();
		var url = event.getUrl();
		var pickId = event.getPickId();
		var userId = event.getUserId();
		log.info("픽 조회 이벤트 : url={}, pickId={}, userId={}", url, pickId, userId);
		updateLinkViewCount(date, url);
	}

	/**
	 * 공개 폴더 이벤트 집계
	 *  1. 공유 폴더별 링크(url)에 대한 날별 집계 - 마이페이지에서 폴더 공유자가 확인
	 *  2. 공유 폴더의 픽 조회도 전체 링크 조회에 포함시켜 집계.
	 * TODO: 정상적인 공개 폴더인지 검증하는 로직 추가
	 */
	@RabbitHandler
	public void sharedFolderViewEvent(SharedFolderLinkViewEvent event) {
		var date = event.getTime().toLocalDate();
		var url = event.getUrl();
		var folderAccessToken = event.getFolderAccessToken();
		log.info("공개 폴더 픽 조회 이벤트 : url={}, folder={}", url, folderAccessToken);
		updateSharedFolderViewCount(date, url, folderAccessToken);
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
		var linkViewCount = pickViewCountRepository
			.findLinkViewCountByDateAndUrl(date, url)
			.orElseGet(() -> new PickViewCount(date, url));
		linkViewCount.incrementCount();
		pickViewCountRepository.save(linkViewCount);
	}

	private void updateLinkPickedCount(LocalDate date, String url) {
		var linkPickedCount = pickCreateCountRepository
			.findPickCreateCountByDateAndUrl(date, url)
			.orElseGet(() -> new PickCreateCount(date, url));
		linkPickedCount.incrementCount();
		pickCreateCountRepository.save(linkPickedCount);
	}

	private void updateSharedFolderViewCount(LocalDate date, String url, String folderAccessToken) {
		var sharedFolderLinkViewCount = sharedFolderPickViewCountRepository
			.findSharedFolderPickViewCountByDateAndUrl(date, url)
			.orElseGet(() -> new SharedFolderPickViewCount(date, url, folderAccessToken));
		sharedFolderLinkViewCount.incrementCount();
		sharedFolderPickViewCountRepository.save(sharedFolderLinkViewCount);
	}
}
