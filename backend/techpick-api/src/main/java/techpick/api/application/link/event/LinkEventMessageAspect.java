package techpick.api.application.link.event;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import techpick.api.application.link.dto.LinkApiResponse;
import techpick.event.RabbitMqConfig;
import techpick.security.annotation.LoginUserId;

@Slf4j
@Aspect
@Component
@RequiredArgsConstructor
public class LinkEventMessageAspect {

    private final RabbitTemplate rabbitTemplate;

    @Around("@annotation(sendLinkEvent)")
    public Object around(
        ProceedingJoinPoint joinPoint, SendLinkEventToMessageQueue sendLinkEvent
    ) throws Throwable {
        var responseEntity = (ResponseEntity<?>)joinPoint.proceed();
        var responseBody = (LinkApiResponse)responseEntity.getBody();
        var args = joinPoint.getArgs();

        Long loginUserId = null;
        for (Object arg : args) {
            if (arg.getClass().getAnnotation(LoginUserId.class) != null) {
                loginUserId = (Long)arg;
            }
        }
        rabbitTemplate.convertAndSend(
            RabbitMqConfig.EXCHANGE_NAME, "",
            new LinkApiEvent(loginUserId, sendLinkEvent.actionType(), (responseBody.id()))
        );
        return responseEntity;
    }
}
