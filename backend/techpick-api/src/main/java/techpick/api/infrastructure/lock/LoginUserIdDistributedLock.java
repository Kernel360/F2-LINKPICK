package techpick.api.infrastructure.lock;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * @author sangwon
 * key : 락을 걸 이름을 지정합니다.
 * 실제로 락 이름은 key + _ + userId로 설정합니다.
 * 분산 락을 걸어서 동시성 문제를 제어합니다.
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface LoginUserIdDistributedLock {
	String key();

	long timeout() default 3000;
}
