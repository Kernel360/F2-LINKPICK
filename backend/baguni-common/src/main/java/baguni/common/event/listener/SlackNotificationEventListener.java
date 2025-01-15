package baguni.common.event.listener;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.slack.api.Slack;
import com.slack.api.model.Attachment;
import com.slack.api.model.Field;
import com.slack.api.webhook.Payload;

import baguni.common.config.RabbitmqConfig;
import baguni.common.event.events.ErrorLogEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 	@author sangwon
 * 	메세지 큐에서 이벤트를 꺼내서 슬랙에 알림을 보내는 클래스
 * 	Webhook url에 post 요청을 보내면 슬랙에 알림이 가는 시스템
 */
@Slf4j
@Component
@RequiredArgsConstructor
@RabbitListener(queues = {RabbitmqConfig.QUEUE.SLACK_NOTIFICATION})
public class SlackNotificationEventListener {

	private final Slack slack = Slack.getInstance();

	@Value("${slack.webhook.url}")
	private String webhookUrl;

	@RabbitHandler
	public void sendSlackMessage(ErrorLogEvent event) {
		Attachment attachment = new Attachment();
		attachment.setFallback("Error");
		attachment.setColor("danger"); // 슬랙 메세지 색상

		Field[] fields = new Field[] {
			Field.builder().title("요청 시간").value(event.getRequestTime()).build(),
			Field.builder().title("Request Method + URI").value(event.getRequestMethod() + " " + event.getRequestUri()).build(),
			Field.builder().title("응답 코드").value(event.getHttpStatusCode() + " " + event.getHttpStatusMessage()).build(),
			Field.builder().title("Exception 종류").value(event.getExceptionClass()).build(),
			Field.builder().title("예외 메시지").value(event.getExceptionMessage()).build(),
			Field.builder().title("Request IP").value(event.getRequestAddress()).build(),
			Field.builder().title("Profile 정보").value(event.getProfile()).build()
		};
		attachment.setFields(Arrays.asList(fields));

		// 슬랙 알림에 어떤 데이터를 보여줄 지 정하는 곳
		// 이미지와 이름은 웹 훅에서 설정해두었기 때문에 생략
		Payload payload = Payload.builder()
			.text("[서버 에러 발생]") // 에러 제목
			.attachments(List.of(attachment)) // Field에 지정한 메세지들
			.build();

		try {
			// 슬랙에 알림을 보내는 부분
			slack.send(webhookUrl, payload);
		} catch (IOException e) {
			log.error("슬랙 알림 전송 실패 : {}", e.getMessage(), e);
		}
	}
}