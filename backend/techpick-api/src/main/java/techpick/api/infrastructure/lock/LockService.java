package techpick.api.infrastructure.lock;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import techpick.api.infrastructure.lock.util.LockException;

@Service
@RequiredArgsConstructor
public class LockService {

	private final LockProvider lockProvider;

	@Transactional
	public void acquireLock(String key, long timeout, Long userId) {
		if (!lockProvider.acquireLock(key, timeout, userId)) {
			throw new LockException("락 획득 실패, key : " + key);
		}
	}

	@Transactional
	public void releaseLock(String key, Long userId) {
		lockProvider.releaseLock(key, userId);
	}
}
