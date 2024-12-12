package techpick.core.model.cache;

import lombok.Getter;

@Getter
public enum CacheType {
	DAILY_LINK_RANK(CACHE_NAME.DAILY_LINK_RANK, 60 * 60, 10000), // 1시간
	WEEKLY_LINK_RANK(CACHE_NAME.WEEKLY_LINK_RANK, 24 * 60 * 60, 10000), // 24시간
	MONTHLY_PICK_RANK(CACHE_NAME.MONTHLY_PICK_RANK, 3 * 60 * 60, 10000); // 3시간

	CacheType(String cacheName, int expireAfterWrite, int maximumSize) {
		this.cacheName = cacheName;
		this.expireAfterWrite = expireAfterWrite;
		this.maximumSize = maximumSize;
	}

	private final String cacheName;
	private final int expireAfterWrite;
	private final int maximumSize;

	public static class CACHE_NAME {
		public static final String DAILY_LINK_RANK = "daily_link_rank";
		public static final String WEEKLY_LINK_RANK = "weekly_link_rank";
		public static final String MONTHLY_PICK_RANK = "monthly_pick_rank";
	}

}