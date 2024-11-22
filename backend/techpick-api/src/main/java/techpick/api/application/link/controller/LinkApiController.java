package techpick.api.application.link.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import techpick.api.application.link.dto.LinkApiMapper;
import techpick.api.application.link.dto.LinkApiResponse;
import techpick.api.domain.link.dto.LinkResult;
import techpick.api.domain.link.service.LinkService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/links")
@Tag(name = "Link API", description = "링크 API")
public class LinkApiController {

	private final LinkService linkService;
	private final LinkApiMapper linkApiMapper;

	@GetMapping
	@Operation(summary = "해당 링크 og 데이터 조회", description = "해당 링크의 og 태그 데이터를 스크래핑을 통해 가져옵니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "조회 성공")
	})
	public ResponseEntity<LinkApiResponse> getLinkData(
		@Parameter(description = "og 태그 데이터 가져올 url") @RequestParam String url
	) {
		LinkResult linkResult = linkService.getUpdateOgTag(url);
		return ResponseEntity.ok(linkApiMapper.toLinkResult(linkResult));
	}
}
