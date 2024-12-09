package techpick.api.application.pick.controller;

import java.util.List;
import java.util.Objects;

import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Slice;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import techpick.api.application.pick.dto.PickApiMapper;
import techpick.api.application.pick.dto.PickApiRequest;
import techpick.api.application.pick.dto.PickApiResponse;
import techpick.api.application.pick.dto.PickSliceResponse;
import techpick.api.domain.pick.dto.PickResult;
import techpick.api.domain.pick.exception.ApiPickException;
import techpick.api.domain.pick.service.PickSearchService;
import techpick.api.domain.pick.service.PickService;
import techpick.security.annotation.LoginUserId;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/picks")
@Tag(name = "Pick API", description = "픽 API")
public class PickApiController {

	private final PickService pickService;
	private final PickApiMapper pickApiMapper;
	private final PickSearchService pickSearchService;

	@GetMapping
	@Operation(summary = "폴더 리스트 내 픽 리스트 조회", description = "해당 폴더 리스트 각각의 픽 리스트를 조회합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "픽 리스트 조회 성공")
	})
	public ResponseEntity<List<PickApiResponse.FolderPickList>> getFolderChildPickList(
		@LoginUserId Long userId,
		@Parameter(description = "조회할 폴더 ID 목록", example = "1, 2, 3") @RequestParam(required = false, defaultValue =
			"") List<Long> folderIdList) {
		List<PickResult.FolderPickList> folderPickList = pickService.getFolderListChildPickList(
			pickApiMapper.toReadListCommand(userId, folderIdList));

		return ResponseEntity.ok(
			folderPickList.stream()
						  .map(pickApiMapper::toApiFolderPickList)
						  .toList());
	}

	@GetMapping("/search")
	@Operation(summary = "픽 리스트 검색(페이지네이션)", description = "페이지네이션 처리 된 픽 리스트 검색")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "조회 성공")
	})
	public ResponseEntity<PickSliceResponse<PickApiResponse.Pick>> searchPickPagination(
		@LoginUserId Long userId,
		@Parameter(description = "조회할 폴더 ID 목록", example = "1, 2, 3") @RequestParam(required = false, defaultValue =
			"") List<Long> folderIdList,
		@Parameter(description = "검색 토큰 목록", example = "리액트, 쿼리, 서버") @RequestParam(required = false, defaultValue =
			"") List<String> searchTokenList,
		@Parameter(description = "검색 태그 ID 목록", example = "1, 2, 3") @RequestParam(required = false,
			defaultValue = "") List<Long> tagIdList,
		@Parameter(description = "픽 시작 id 조회", example = "0") @RequestParam(required = false, defaultValue = "0") Long cursor,
		@Parameter(description = "한 페이지에 가져올 픽 개수", example = "20") @RequestParam(required = false, defaultValue = "20"
		) int size
	) {
		Slice<PickResult.Pick> pickResultList = pickSearchService.searchPickPagination(
			pickApiMapper.toSearchPaginationCommand(userId, folderIdList, searchTokenList, tagIdList, cursor, size));

		return ResponseEntity.ok(new PickSliceResponse<>(pickApiMapper.toSliceApiResponse(pickResultList)));
	}

	@GetMapping("/search/all")
	@Operation(summary = "픽 리스트 검색", description = "페이지네이션 처리 되지 않은 픽 리스트 검색")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "조회 성공")
	})
	public ResponseEntity<List<PickApiResponse.Pick>> searchPick(
		@LoginUserId Long userId,
		@ParameterObject @ModelAttribute PickApiRequest.Search request
	) {
		List<PickResult.Pick> pickList = pickSearchService.searchPick(
			pickApiMapper.toSearchCommand(userId, request));

		List<PickApiResponse.Pick> pickResponseList = pickList.stream()
															  .map(pickApiMapper::toApiResponse)
															  .toList();
		return ResponseEntity.ok(pickResponseList);
	}

	/**
	 * @deprecated
	 * 현재 익스텐션에서만 사용되며, 추후 없어질 예정입니다.
	 */
	@Deprecated
	@GetMapping("/link")
	@Operation(
		summary = "[Deprecated] 링크 픽 여부 조회",
		description = """
				해당 링크를 픽한 적이 있는지 확인합니다.
				픽이 존재하지 않음을 4XX로 판단하는 것이 프론트엔드에서 처리하기 까다로워
				Deprecated 처리하였습니다.
			""")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "픽 여부 조회 성공"),
		@ApiResponse(responseCode = "404", description = "해당 링크에 대해 픽이 되어 있지 않습니다.")
	})
	public ResponseEntity<PickApiResponse.Pick> getPickUrl(@LoginUserId Long userId,
		@RequestParam String link) {
		return ResponseEntity.ok(pickApiMapper.toApiResponse(pickService.getPickUrl(userId, link)));
	}

	/**
	 * @author minkyeu kim
	 * 프론트엔드에서 4XX를 픽 없음으로 판단하는 로직이 불편하기 때문에
	 * Boolean으로 픽이 있다 없다를 판단하도록 변경합니다.
	 * 익스텐션은 구글 심사 때문에 기존 getLinkDataXXX를 이용하고, 추후 getLinkDataV2 로 교체할 예정
	 */
	@GetMapping("/link-v2")
	@Operation(summary = "링크 픽 여부 조회", description = "해당 링크를 픽한 적이 있는지 확인합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "픽 여부 조회 성공"),
	})
	public ResponseEntity<PickApiResponse.PickExists> doesUserHasPickWithGivenUrl(
		@LoginUserId Long userId, @RequestParam String link
	) {
		var response = pickService.findPickUrl(userId, link)
								  .map(pickApiMapper::toApiResponse)
								  .map(pick -> new PickApiResponse.PickExists(true, pick))
								  .orElseGet(() -> new PickApiResponse.PickExists(false, null));
		return ResponseEntity.ok(response);
	}

	@GetMapping("/{id}")
	@Operation(summary = "픽 상세 조회", description = "픽을 상세 조회합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "픽 상세 조회 성공")
	})
	public ResponseEntity<PickApiResponse.Pick> getPick(@LoginUserId Long userId,
		@PathVariable Long id) {
		return ResponseEntity.ok(
			pickApiMapper.toApiResponse(
				pickService.getPick(pickApiMapper.toReadCommand(userId, new PickApiRequest.Read(id)))));
	}

	@PostMapping
	@Operation(summary = "픽 생성", description = "픽을 생성합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "픽 생성 성공"),
		@ApiResponse(responseCode = "401", description = "잘못된 태그 접근"),
		@ApiResponse(responseCode = "403", description = "접근할 수 없는 폴더")
	})
	public ResponseEntity<PickApiResponse.Pick> savePick(@LoginUserId Long userId,
		@Valid @RequestBody PickApiRequest.Create request) {
		if (!Objects.isNull(request.title()) && 200 < request.title().length()) {
			throw ApiPickException.PICK_TITLE_TOO_LONG();
		}

		return ResponseEntity.ok(
			pickApiMapper.toApiResponse(pickService.saveNewPick(pickApiMapper.toCreateCommand(userId, request))));
	}

	@PatchMapping
	@Operation(summary = "픽 내용 수정", description = "픽 내용(제목, 메모)을 수정합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "픽 내용 수정 성공")
	})
	public ResponseEntity<PickApiResponse.Pick> updatePick(@LoginUserId Long userId,
		@Valid @RequestBody PickApiRequest.Update request) {
		if (!Objects.isNull(request.title()) && 200 < request.title().length()) {
			throw ApiPickException.PICK_TITLE_TOO_LONG();
		}

		return ResponseEntity.ok(
			pickApiMapper.toApiResponse(pickService.updatePick(pickApiMapper.toUpdateCommand(userId, request))));
	}

	@PatchMapping("/location")
	@Operation(summary = "픽 이동", description = "픽을 같은 폴더 혹은 다른 폴더로 이동합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "204", description = "픽 이동 성공"),
		@ApiResponse(responseCode = "400", description = "폴더가 존재하지 않음.")
	})
	public ResponseEntity<Void> movePick(@LoginUserId Long userId,
		@Valid @RequestBody PickApiRequest.Move request) {
		pickService.movePick(pickApiMapper.toMoveCommand(userId, request));
		return ResponseEntity.noContent().build();
	}

	@DeleteMapping
	@Operation(summary = "픽 삭제", description = "휴지통에 있는 픽만 삭제 가능합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "204", description = "픽 삭제 성공"),
		@ApiResponse(responseCode = "406", description = "휴지통이 아닌 폴더에서 픽 삭제 불가"),
		@ApiResponse(responseCode = "500", description = "미확인 서버 에러 혹은 존재하지 않는 픽 삭제")
	})
	public ResponseEntity<Void> deletePick(@LoginUserId Long userId,
		@Valid @RequestBody PickApiRequest.Delete request) {
		pickService.deletePick(pickApiMapper.toDeleteCommand(userId, request));
		return ResponseEntity.noContent().build();
	}
}
