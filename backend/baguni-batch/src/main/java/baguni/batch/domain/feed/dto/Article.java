package baguni.batch.domain.feed.dto;

/**
 * 공통 Feed DTO
 * RssFeed, AtomFeed -> Article DTO로 변환
 */
public record Article(String title, String link, String date) {
}
