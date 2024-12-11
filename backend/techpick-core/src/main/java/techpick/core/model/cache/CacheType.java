package techpick.core.model.cache;

import lombok.Getter;

@Getter
public enum CacheType {
	DAILY_LINK_RANK("daily_link_rank", 60 * 60, 10000), // 1시간
	WEEKLY_LINK_RANK("weekly_link_rank", 24 * 60 * 60, 10000), // 24시간
	MONTHLY_PICK_RANK("monthly_pick_rank", 3 * 60 * 60, 10000); // 1시간

	CacheType(String cacheName, int expireAfterWrite, int maximumSize) {
		this.cacheName = cacheName;
		this.expireAfterWrite = expireAfterWrite;
		this.maximumSize = maximumSize;
	}

	private final String cacheName;
	private final int expireAfterWrite;
	private final int maximumSize;
}