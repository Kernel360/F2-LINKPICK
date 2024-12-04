package techpick.api.infrastructure.lock.util;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import techpick.api.annotation.LoginUserIdDistributedLock;
import techpick.api.infrastructure.lock.LockProvider;
import techpick.security.annotation.LoginUserId;

@Aspect
@Component
@RequiredArgsConstructor
public class LoginUserIdDistributedLockAspect {

	private final LockProvider lockProvider;

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
