package baguni.core.util;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Aspect
@Component
@RequiredArgsConstructor
public class MeasureTimeAspect {

	private final RequestHolder requestHolder;

	@Pointcut("@annotation(baguni.core.annotation.BaguniAnnotation.MeasureTime)")
	public void pointcut() {
	}

	@Around("pointcut()")
	public Object around(ProceedingJoinPoint joinPoint) throws Throwable {
		var methodName = joinPoint.getSignature().getName();
		// 필요하다면 StopWatch 클래스 도입 고려
		long startTime = System.currentTimeMillis();
		var result = joinPoint.proceed();
		long endTime = System.currentTimeMillis();
		log.info("{} 실행 시간 : {} ms \n request : {} ", methodName, endTime - startTime, requestHolder.getRequest());
		return result;
	}
}
