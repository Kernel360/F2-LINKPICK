package kernel360.techpick.core.util;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Aspect
@Component
public class MeasureTimeAspect {

	@Pointcut("@annotation(kernel360.techpick.core.annotation.MeasureTime)")
	public void pointcut() {
	}

	@Around("pointcut()")
	public void around(ProceedingJoinPoint joinPoint) throws Throwable {
		var methodName = joinPoint.getSignature().getName();
		// 필요하다면 StopWatch 클래스 도입 고려
		long startTime = System.currentTimeMillis();
		joinPoint.proceed();
		long endTime = System.currentTimeMillis();
		log.info("{} 걸린시간 : {} ms", methodName, endTime - startTime);
	}
}
