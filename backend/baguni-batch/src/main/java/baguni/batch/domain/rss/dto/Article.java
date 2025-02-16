package baguni.batch.domain.rss.dto;

/**
 * 공통 Feed DTO
 * RssFeed, AtomFeed -> Article DTO로 변환
 */
public record Article(String title, String link, String date) {
}
