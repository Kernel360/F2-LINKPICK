package baguni.api.application.mobile.controller;

import java.util.List;

import org.springframework.data.domain.Slice;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import baguni.api.application.folder.dto.FolderApiMapper;
import baguni.api.application.folder.dto.FolderApiResponse;
import baguni.api.application.pick.dto.PickApiMapper;
import baguni.api.application.pick.dto.PickApiResponse;
import baguni.api.application.pick.dto.PickSliceResponse;
import baguni.api.service.folder.service.FolderService;
import baguni.api.service.pick.service.PickService;
import baguni.api.service.sharedFolder.service.SharedFolderService;
import baguni.domain.infrastructure.folder.dto.FolderResult;
import baguni.domain.infrastructure.pick.dto.PickResult;
import baguni.security.annotation.LoginUserId;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/mobile")
@Tag(name = "모바일 API", description = "모바일 전용 API")
public class MobileApiController {

	private final PickService pickService;
	private final PickApiMapper pickApiMapper;
	private final FolderService folderService;
	private final SharedFolderService sharedFolderService;
	private final FolderApiMapper folderApiMapper;

	@GetMapping("/folders")
	@Operation(summary = "미분류, 휴지통 폴더와 루트 하위 폴더 조회",
		description = """
				폴더 depth가 1인 경우만 조회합니다.
				사용자의 미분류, 휴지통 폴더와 루트 하위 전체 폴더를 조회합니다.
				루트 폴더는 조회하지 않습니다.
			""")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "조회 성공"),
		@ApiResponse(responseCode = "401", description = "본인 폴더만 조회할 수 있습니다.")
	})
	public ResponseEntity<List<FolderApiResponse>> getMobileFolderList(@LoginUserId Long userId) {
		return ResponseEntity.ok(
			folderService.getMobileFolderList(userId).stream()
						 .map(this::toApiResponseWithFolderAccessToken)
						 .toList()
		);
	}

	@GetMapping("/picks")
	@Operation(summary = "폴더 내 픽 페이지네이션 리스트 조회",
		description = """
				해당 폴더의 픽 리스트를 조회합니다.
				커서 기반 페이지네이션 처리된 리스트가 반환됩니다.
			""")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "픽 리스트 조회 성공")
	})
	public ResponseEntity<PickSliceResponse<PickApiResponse.Pick>> getFolderChildPickPagination(
		@LoginUserId Long userId,
		@Parameter(description = "조회할 폴더 ID", example = "1") @RequestParam Long folderId,
		@Parameter(description = """
				다음에 조회할 커서(cursor) 값입니다.
				처음 페이지를 조회할 때는 0을 넣어주세요.
				이후에는 응답으로 받은 lastCursor 값을 그대로 사용하시면 됩니다.
				예시: lastCursor = 1 → 다음 요청에 cursor=1을 넣으면, 1은 제외하고 2부터 조회합니다.
			""",
			example = "0") @RequestParam(required = false, defaultValue = "0") Long cursor,
		@Parameter(description = "한 페이지에 가져올 픽 개수", example = "20") @RequestParam(required = false, defaultValue = "20") int size
	) {
		var command = pickApiMapper.toReadPaginationCommand(userId, folderId, cursor, size);
		var pickList = pickService.getFolderListChildPickPagination(command);
		return ResponseEntity.ok(pickApiMapper.toSliceApiResponse(pickList));
	}

	private FolderApiResponse toApiResponseWithFolderAccessToken(FolderResult folder) {
		String folderAccessToken = sharedFolderService
			.findFolderAccessTokenByFolderId(folder.id())
			.orElse(null);
		return folderApiMapper.toApiResponse(folder, folderAccessToken);
	}
}
