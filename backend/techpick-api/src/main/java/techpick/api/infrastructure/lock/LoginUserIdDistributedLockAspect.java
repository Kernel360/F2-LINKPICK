package techpick.api.infrastructure.lock;

import java.lang.reflect.Field;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import techpick.core.annotation.TechpickAnnotation;
import techpick.security.annotation.LoginUserId;

@Aspect
@Component
@RequiredArgsConstructor
public class LoginUserIdDistributedLockAspect {

	private final LockProvider lockProvider;

	// TODO: @LoginUserId를 이용하면 userId를 받아올 수 있지 않을까?
	@Around("@annotation(loginUserIdDistributedLock)")
	public Object handleDistributedLock(ProceedingJoinPoint joinPoint,
		LoginUserIdDistributedLock loginUserIdDistributedLock, @LoginUserId Long userId) throws Throwable {
		String key = loginUserIdDistributedLock.key();
		long timeout = loginUserIdDistributedLock.timeout();

		if (!lockProvider.acquireLock(key, timeout, userId)) {
			throw new LockException("락 획득 실패, key : " + key);
		}

		try {
			return joinPoint.proceed();
		} finally {
			lockProvider.releaseLock(key, userId);
		}
	}
}
