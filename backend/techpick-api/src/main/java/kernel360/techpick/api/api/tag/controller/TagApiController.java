package kernel360.techpick.api.api.tag.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import kernel360.techpick.api.api.tag.dto.TagApiMapper;
import kernel360.techpick.api.api.tag.dto.TagApiRequest;
import kernel360.techpick.api.api.tag.dto.TagApiResponse;
import kernel360.techpick.api.domain.tag.service.TagService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tags")
@Tag(name = "Tag API", description = "태그 API")
public class TagApiController {

	private final TagService tagService;
	private final TagApiMapper tagApiMapper;

	@GetMapping
	@Operation(summary = "태그 조회", description = "사용자가 등록한 전체 태그를 조회합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "조회 성공",
			content = @Content(schema = @Schema(implementation = TagApiResponse.Read.class))
		)
	})
	public ResponseEntity<List<TagApiResponse.Read>> getAllUserTag(Long userId) {
		return ResponseEntity.ok(
			tagService.getUserTagList(userId).stream()
				.map(tagApiMapper::toReadResponse)
				.toList()
		);
	}

	@PostMapping
	@Operation(summary = "태그 추가", description = "새로운 태그를 추가합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "태그 추가 성공",
			content = @Content(schema = @Schema(implementation = TagApiResponse.Create.class))
		),
		@ApiResponse(responseCode = "400", description = "중복된 태그 이름", content = @Content(schema = @Schema()))
	})
	public ResponseEntity<TagApiResponse.Create> createTag(Long userId, TagApiRequest.Create request) {
		return ResponseEntity.ok(
			tagApiMapper.toCreateResponse(tagService.saveTag(tagApiMapper.toCreateCommand(userId, request))));
	}

	@PutMapping
	@Operation(summary = "태그 수정", description = "사용자가 등록한 태그를 수정합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "태그 수정 성공"),
		@ApiResponse(responseCode = "400", description = "중복된 태그 이름"),
		@ApiResponse(responseCode = "401", description = "본인 태그만 수정할 수 있습니다.")
	})
	public ResponseEntity<Void> updateTag(Long userId, TagApiRequest.Update request) {
		tagService.updateTag(tagApiMapper.toUpdateCommand(userId, request));
		return ResponseEntity.noContent().build();
	}

	@PatchMapping
	@Operation(summary = "태그 이동", description = "사용자가 등록한 태그의 순서를 변경합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "태그 이동 성공"),
		@ApiResponse(responseCode = "401", description = "본인 태그만 이동할 수 있습니다.")
	})
	public ResponseEntity<Void> moveTag(Long userId, TagApiRequest.Move request) {
		tagService.moveUserTag(tagApiMapper.toMoveCommand(userId, request));
		return ResponseEntity.noContent().build();
	}

	@DeleteMapping
	@Operation(summary = "태그 삭제", description = "사용자가 등록한 태그를 삭제합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "태그 삭제 성공"),
		@ApiResponse(responseCode = "401", description = "본인 태그만 삭제할 수 있습니다.")
	})
	public ResponseEntity<Void> deleteTag(Long userId, TagApiRequest.Delete request) {
		tagService.deleteTag(tagApiMapper.toDeleteCommand(userId, request));
		return ResponseEntity.noContent().build();
	}
}
