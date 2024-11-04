package techpick.api.application.folder.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import techpick.api.application.folder.dto.FolderApiMapper;
import techpick.api.application.folder.dto.FolderApiRequest;
import techpick.api.application.folder.dto.FolderApiResponse;
import techpick.api.domain.folder.service.FolderService;
import techpick.security.annotation.LoginUserId;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/folders")
@Tag(name = "Folder API", description = "폴더 API")
public class FolderApiController {

	private final FolderService folderService;
	private final FolderApiMapper mapper;

	@GetMapping("/root")
	@Operation(summary = "루트 폴더 조회", description = "사용자의 루트 폴더를 조회합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "조회 성공")
	})
	public ResponseEntity<FolderApiResponse> getRootFolder(@Parameter(hidden = true) @LoginUserId Long userId) {
		return ResponseEntity.ok(mapper.toApiResponse(folderService.getRootFolder(userId)));
	}

	@GetMapping("/unclassified")
	@Operation(summary = "미분류 폴더 조회", description = "사용자의 미분류 폴더를 조회합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "조회 성공")
	})
	public ResponseEntity<FolderApiResponse> getUnclassifiedFolder(@Parameter(hidden = true) @LoginUserId Long userId) {
		return ResponseEntity.ok(mapper.toApiResponse(folderService.getUnclassifiedFolder(userId)));
	}

	@GetMapping("/recycle-bin")
	@Operation(summary = "휴지통 조회", description = "사용자의 휴지통을 조회합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "조회 성공")
	})
	public ResponseEntity<FolderApiResponse> getRecycleBinFolder(@Parameter(hidden = true) @LoginUserId Long userId) {
		return ResponseEntity.ok(mapper.toApiResponse(folderService.getRecycleBin(userId)));
	}

	@GetMapping("/{folderId}/children")
	@Operation(summary = "자식 폴더 리스트 조회", description = "특정 폴더의 자식 폴더 리스트를 조회합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "조회 성공"),
		@ApiResponse(responseCode = "401", description = "본인 폴더만 조회할 수 있습니다.")
	})
	public ResponseEntity<List<FolderApiResponse>> getChildrenFolder(@Parameter(hidden = true) @LoginUserId Long userId,
		@PathVariable Long folderId) {
	return ResponseEntity.ok(
			folderService.getChildFolderList(mapper.toReadCommand(userId, folderId))
				.stream()
				.map(mapper::toApiResponse)
			.toList()
		);
	}

	@PostMapping
	@Operation(summary = "폴더 추가", description = "새로운 폴더를 추가합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "폴더 추가 성공")
	})
	public ResponseEntity<FolderApiResponse> createFolder(@Parameter(hidden = true) @LoginUserId Long userId,
		FolderApiRequest.Create request) {
		return ResponseEntity.ok(
			mapper.toApiResponse(folderService.saveFolder(mapper.toCreateCommand(userId, request)))
		);
	}

	@PatchMapping
	@Operation(summary = "폴더 수정", description = "사용자가 등록한 폴더를 수정합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "폴더 수정 성공"),
		@ApiResponse(responseCode = "400", description = "기본 폴더는 수정할 수 없습니다."),
		@ApiResponse(responseCode = "401", description = "본인 폴더만 수정할 수 있습니다.")
	})
	public ResponseEntity<Void> updateFolder(@Parameter(hidden = true) @LoginUserId Long userId,
		FolderApiRequest.Update request) {
		folderService.updateFolder(mapper.toUpdateCommand(userId, request));
		return ResponseEntity.noContent().build();
	}

	@PutMapping
	@Operation(summary = "폴더 이동", description = "사용자가 등록한 폴더를 이동합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "폴더 이동 성공"),
		@ApiResponse(responseCode = "400", description = "기본 폴더는 이동할 수 없습니다."),
		@ApiResponse(responseCode = "401", description = "본인 폴더만 이동할 수 있습니다."),
		@ApiResponse(responseCode = "406", description = "부모가 다른 폴더들을 동시에 이동할 수 없습니다.")
	})
	public ResponseEntity<Void> moveFolder(@Parameter(hidden = true) @LoginUserId Long userId,
		FolderApiRequest.Move request) {
		folderService.moveFolder(mapper.toMoveCommand(userId, request));
		return ResponseEntity.noContent().build();
	}

	@DeleteMapping
	@Operation(summary = "폴더 삭제", description = "사용자가 등록한 폴더를 삭제합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "폴더 삭제 성공"),
		@ApiResponse(responseCode = "400", description = "기본 폴더는 삭제할 수 없습니다."),
		@ApiResponse(responseCode = "401", description = "본인 폴더만 삭제할 수 있습니다.")
	})
	public ResponseEntity<Void> deleteFolder(@Parameter(hidden = true) @LoginUserId Long userId,
		FolderApiRequest.Delete request) {
		folderService.deleteFolder(mapper.toDeleteCommand(userId, request));
		return ResponseEntity.noContent().build();
	}

}
