package techpick.core.rabbitmq;

import java.util.Objects;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import techpick.core.annotation.TechpickAnnotation;

/**
 * @author minkyeu kim
 * 컨트롤러의 반환 값을 이용해서 이벤트를 생성하고 전송하는 AOP
 * sendEvent 어노테이션의 type parameter를 함께 설정합니다.
 */
@Aspect
@Component
@RequiredArgsConstructor
public class EventMessageAspect {

    private final EventSender eventSender;

    @AfterReturning(value = "@annotation(sendEvent)", returning = "response")
    public void sendEvent(
        JoinPoint jp,
        ResponseEntity<? extends ResponseToEvent> response,
        TechpickAnnotation.SendEvent sendEvent
    ) {
        var responseBody = response.getBody();
        if (Objects.isNull(responseBody)) {
            throw new EventProcessingError(
                String.format("%s : ResponseBody가 null이여서 이벤트로 변환할 수 없습니다.", jp.getSignature())
            );
        }
        eventSender.sendEvent(responseBody.toEvent(sendEvent.type()/* 생성/조회/삭제/수정 */));
    }
}
