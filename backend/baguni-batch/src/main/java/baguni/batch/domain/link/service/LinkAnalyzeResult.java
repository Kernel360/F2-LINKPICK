package baguni.batch.domain.link.service;

import lombok.Builder;

@Builder
public record LinkAnalyzeResult(
	String imageUrl,
	String title,
	String description,
	String publishedAt,
	String publisher // 링크 작성자
) {
}
