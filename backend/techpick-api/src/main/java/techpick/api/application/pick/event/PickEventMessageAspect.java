package techpick.api.application.pick.event;

import java.util.List;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.amqp.core.FanoutExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import techpick.api.application.pick.dto.PickApiResponse;
import techpick.api.infrastructure.tag.TagDataHandler;
import techpick.core.model.tag.Tag;
import techpick.event.RabbitMqConfig;
import techpick.security.annotation.LoginUserId;

@Slf4j
@Aspect
@Component
@RequiredArgsConstructor
public class PickEventMessageAspect {

    private final TagDataHandler tagDataHandler;
    private final RabbitTemplate rabbitTemplate;

    @Around("@annotation(sendPickEvent)")
    public Object around(
        ProceedingJoinPoint joinPoint, SendPickEventToMessageQueue sendPickEvent
    ) throws Throwable {
        var responseEntity = (ResponseEntity<?>)joinPoint.proceed();
        var responseBody = (PickApiResponse.Pick)responseEntity.getBody();
        var args = joinPoint.getArgs();

        Long loginUserId = null;
        for (Object arg : args) {
            if (arg.getClass().getAnnotation(LoginUserId.class) != null) {
                loginUserId = (Long)arg;
            }
        }

        List<String> tagNames = responseBody
            .tagIdOrderedList()
            .stream()
            .map(tagDataHandler::getTag)
            .map(Tag::getName)
            .toList();

        var event = new PickApiEvent(loginUserId, sendPickEvent.actionType(), responseBody.id(), tagNames);
        rabbitTemplate.convertAndSend(RabbitMqConfig.EXCHANGE_NAME, "", event);

        return responseEntity;
    }
}
