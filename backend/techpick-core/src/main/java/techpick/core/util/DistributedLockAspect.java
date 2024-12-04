package techpick.core.util;

import java.lang.reflect.Field;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import techpick.core.annotation.TechpickAnnotation;

@Aspect
@Component
@RequiredArgsConstructor
public class DistributedLockAspect {

	private final LockProvider lockProvider;

	@Around("@annotation(distributedLock)")
	public Object handleDistributedLock(ProceedingJoinPoint joinPoint, TechpickAnnotation.DistributedLock distributedLock) throws Throwable {
		String key = distributedLock.key();
		long timeout = distributedLock.timeout();
		Long userId = getUserIdFromArgs(joinPoint);

		if (!lockProvider.acquireLock(key, timeout, userId)) {
			throw new RuntimeException("락 획득 실패, key : " + key);
		}

		try {
			return joinPoint.proceed();
		} finally {
			lockProvider.releaseLock(key, userId);
		}
	}

	private Long getUserIdFromArgs(JoinPoint joinPoint) {
		Object[] args = joinPoint.getArgs();
		MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();
		String[] parameterNames = methodSignature.getParameterNames();

		for (int i = 0; i < parameterNames.length; i++) {
			Object arg = args[i];

			if ("userId".equals(parameterNames[i]) && arg instanceof Long) {
				return (Long) arg;
			}

			if (arg != null) {
				try {
					// Reflection으로 "userId" 필드를 추출
					Field field = arg.getClass().getDeclaredField("userId");
					field.setAccessible(true); // private 필드 접근 허용
					Object userId = field.get(arg);
					if (userId instanceof Long) {
						return (Long) userId;
					}
				} catch (NoSuchFieldException | IllegalAccessException ignored) {
					// 해당 파라미터에 "userId"가 없으면 무시
				}
			}
		}

		throw new IllegalArgumentException("userId 파라미터를 찾을 수 없습니다.");	}
}
