package kernel360.techpick.feature.api.pick.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import kernel360.techpick.core.annotation.LoginUserId;
import kernel360.techpick.feature.api.pick.dto.PickApiMapper;
import kernel360.techpick.feature.api.pick.dto.PickApiRequest;
import kernel360.techpick.feature.api.pick.dto.PickApiResponse;
import kernel360.techpick.feature.domain.pick.service.PickService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/picks")
@Tag(name = "Pick API", description = "픽 API")
public class PickApiController {

	private final PickService pickService;
	private final PickApiMapper pickApiMapper;

	@GetMapping
	@Operation(summary = "링크 픽 여부 조회", description = "해당 링크를 픽한 적이 있는지 확인합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "픽 여부 조회 성공"),
		@ApiResponse(responseCode = "404", description = "해당 링크에 대해 픽이 되어 있지 않습니다.")
	})
	public ResponseEntity<PickApiResponse> getPickUrl(@LoginUserId Long userId, @RequestParam String link) {
		return ResponseEntity.ok(pickApiMapper.toApiResponse(pickService.getPickUrl(userId, link)));
	}

	@GetMapping("/{pickId}")
	@Operation(summary = "픽 상세 조회", description = "픽을 상세 조회합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "픽 상세 조회 성공")
	})
	public ResponseEntity<PickApiResponse> getPick(@LoginUserId Long userId, @PathVariable Long pickId) {
		return ResponseEntity.ok(
			pickApiMapper.toApiResponse(
				pickService.getPick(pickApiMapper.toReadCommand(userId, new PickApiRequest.Read(pickId)))));
	}

	@PostMapping
	@Operation(summary = "픽 생성", description = "픽을 생성합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "픽 생성 성공"),
		@ApiResponse(responseCode = "401", description = "잘못된 태그 접근"),
		@ApiResponse(responseCode = "403", description = "접근할 수 없는 폴더")
	})
	public ResponseEntity<PickApiResponse> savePick(@LoginUserId Long userId,
		@Valid @RequestBody PickApiRequest.Create request) {
		return ResponseEntity.ok(
			pickApiMapper.toApiResponse(pickService.saveNewPick(pickApiMapper.toCreateCommand(userId, request))));
	}

	@PatchMapping("/{pickId}")
	@Operation(summary = "픽 내용 수정", description = "픽 내용(제목, 메모)을 수정합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "픽 내용 수정 성공")
	})
	public ResponseEntity<PickApiResponse> updatePick(@LoginUserId Long userId,
		@Valid @RequestBody PickApiRequest.Update request) {
		return ResponseEntity.ok(
			pickApiMapper.toApiResponse(pickService.updatePick(pickApiMapper.toUpdateCommand(userId, request))));
	}

	@PatchMapping("/location")
	@Operation(summary = "픽 이동", description = "픽을 같은 폴더 혹은 다른 폴더로 이동합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "픽 이동 성공"),
		@ApiResponse(responseCode = "400", description = "폴더가 존재하지 않음.")
	})
	public ResponseEntity<Void> movePick(@LoginUserId Long userId,
		@Valid @RequestBody PickApiRequest.Move request) {
		pickService.movePick(pickApiMapper.toMoveCommand(userId, request));
		return ResponseEntity.ok().build();
	}

	@DeleteMapping
	@Operation(summary = "픽 삭제", description = "휴지통에 있는 픽만 삭제 가능합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "픽 삭제 성공"),
		@ApiResponse(responseCode = "406", description = "휴지통이 아닌 폴더에서 픽 삭제 불가"),
		@ApiResponse(responseCode = "500", description = "미확인 서버 에러 혹은 존재하지 않는 픽 삭제")
	})
	public ResponseEntity<Void> deletePick(@LoginUserId Long userId,
		@Valid @RequestBody PickApiRequest.Delete request) {
		pickService.deletePick(pickApiMapper.toDeleteCommand(userId, request));
		return ResponseEntity.ok().build();
	}

}