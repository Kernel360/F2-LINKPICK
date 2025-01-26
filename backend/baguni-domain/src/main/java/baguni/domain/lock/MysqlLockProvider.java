package baguni.domain.lock;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import baguni.domain.lock.util.LockException;

@Slf4j
@Component
@RequiredArgsConstructor
public class MysqlLockProvider implements LockProvider {

	private final JdbcTemplate jdbcTemplate;

	/**
	 * 락을 획득하는 메서드
	 */
	@Override
	public boolean acquireLock(String key, long timeout, Long userId) {
		String sql = "SELECT GET_LOCK(?, ?)";
		String lockKey = userId + "";
		log.debug("lockKey : {}", lockKey);
		Boolean result = jdbcTemplate.queryForObject(sql, Boolean.class, lockKey, timeout / 1000);
		return Boolean.TRUE.equals(result); // null인 경우 false 반환
	}

	/**
	 * 락을 해제하는 메서드
	 */
	@Override
	public void releaseLock(String key, Long userId) {
		String sql = "SELECT RELEASE_LOCK(?)";
		String lockKey = userId + "";
		Boolean result = jdbcTemplate.queryForObject(sql, Boolean.class, lockKey);
		if (!Boolean.TRUE.equals(result)) {
			String connectionSql = "SELECT CONNECTION_ID()";
			String connectionId = jdbcTemplate.queryForObject(connectionSql, String.class);
			log.error("락 해제 실패, sessionId : {}", connectionId);
			throw new LockException("락 해제 실패 : " + lockKey);
		}
	}
}
