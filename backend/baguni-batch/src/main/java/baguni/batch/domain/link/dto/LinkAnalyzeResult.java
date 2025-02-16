package baguni.batch.domain.link.dto;

import lombok.Builder;

@Builder
public record LinkAnalyzeResult(
	String imageUrl,
	String title,
	String description,
	String publishedAt
	// Link Analyzer 가 고도화 됨에 따라 정보가 추가될 예정 입니다.
) {
}
