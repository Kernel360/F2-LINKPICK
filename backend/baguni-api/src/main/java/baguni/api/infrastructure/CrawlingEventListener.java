package baguni.api.infrastructure;

import org.apache.commons.lang3.StringUtils;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import baguni.api.service.link.dto.LinkResult;
import baguni.api.service.link.service.LinkService;
import baguni.common.config.RabbitmqConfig;
import baguni.common.event.events.CrawlingEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * @author sangwon
 * 익스텐션을 이용하여 미분류로 픽을 담을 때 이벤트를 메세지 큐에 담음.
 * 메세지 큐에 담긴 데이터를 꺼내 imageUrl, description이 비어있을 때 크롤링함.
 */
@Slf4j
@Component
@RequiredArgsConstructor
@RabbitListener(queues = {RabbitmqConfig.QUEUE.PICK_CRAWLING})
public class CrawlingEventListener {

	private final LinkService linkService;

	@RabbitHandler
	public void linkCrawlingEvent(CrawlingEvent event) {
		LinkResult link = linkService.getLinkResult(event.getLinkId(), event.getUrl(), event.getTitle());

		// imageUrl, description이 비어있는 경우에만 OG 태그 업데이트 시도
		if (StringUtils.isEmpty(link.imageUrl()) || StringUtils.isEmpty(link.description())) {
			try {
				linkService.saveLinkAndUpdateOgTagBySelenium(link.url(), link.title());
			} catch (Exception e) {
				log.info("메세지 큐에서 꺼낸 Link OG 크롤링 실패 : ", e);
			}
		}
	}
}
