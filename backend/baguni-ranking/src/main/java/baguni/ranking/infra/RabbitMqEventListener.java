package baguni.ranking.infra;

import java.time.LocalDate;

import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import baguni.common.config.RabbitmqConfig;
import baguni.common.event.events.PickViewEvent;
import baguni.common.event.events.PickCreateEvent;
import baguni.common.event.events.SharedFolderLinkViewEvent;
import baguni.common.event.events.SuggestionViewEvent;
import baguni.ranking.infra.pick.LinkPickedCount;
import baguni.ranking.infra.pick.LinkPickedCountRepository;
import baguni.ranking.infra.pick.LinkViewCount;
import baguni.ranking.infra.pick.LinkViewCountRepository;
import baguni.ranking.infra.sharedFolder.SharedFolderPickViewCount;
import baguni.ranking.infra.sharedFolder.SharedFolderPickViewCountRepository;

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

	private final LinkViewCountRepository linkViewCountRepository;
	private final LinkPickedCountRepository linkPickedCountRepository;
	private final SharedFolderPickViewCountRepository sharedFolderPickViewCountRepository;

	/**
	 * 사용자의 북마크 생성 이벤트 집계
	 */
	@RabbitHandler
	public void pickCreateEvent(PickCreateEvent event) {
		var date = event.getTime().toLocalDate();
		var url = event.getUrl();
		var pickId = event.getPickId(); // unused
		var userId = event.getUserId(); // unused
		updateLinkPickedCount(date, url);
	}

	/**
	 * 사용자의 북마크 조회 이벤트 집계
	 */
	@RabbitHandler
	public void pickViewEvent(PickViewEvent event) {
		var date = event.getTime().toLocalDate();
		var url = event.getUrl();
		var pickId = event.getPickId(); // unused
		var userId = event.getUserId(); // unused
		updateLinkViewCount(date, url);
	}

	/**
	 * 공개 폴더 이벤트 집계
	 *  1. 공유 폴더별 링크(url)에 대한 날별 집계 - 마이페이지에서 폴더 공유자가 확인
	 *  2. 공유 폴더의 픽 조회도 전체 링크 조회에 포함시켜 집계.
	 */
	@RabbitHandler
	public void sharedFolderViewEvent(SharedFolderLinkViewEvent event) {
		var date = event.getTime().toLocalDate();
		var url = event.getUrl();
		var folderAccessToken = event.getFolderAccessToken();
		updateSharedFolderViewCount(date, url, folderAccessToken);
		updateLinkViewCount(date, url);
	}

	/**
	 *  추천 페이지 에서 추천된 링크 클릭 이벤트 집계
	 */
	@RabbitHandler
	public void suggestionViewEvent(SuggestionViewEvent event) {
		var date = event.getTime().toLocalDate();
		var url = event.getUrl();
		var userId = event.getUserId(); // unused
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

	private void updateSharedFolderViewCount(LocalDate date, String url, String folderAccessToken) {
		var sharedFolderLinkViewCount = sharedFolderPickViewCountRepository
			.findSharedFolderPickViewCountByDateAndUrl(date, url)
			.orElseGet(() -> new SharedFolderPickViewCount(date, url, folderAccessToken));
		sharedFolderLinkViewCount.incrementCount();
		sharedFolderPickViewCountRepository.save(sharedFolderLinkViewCount);
	}
}
