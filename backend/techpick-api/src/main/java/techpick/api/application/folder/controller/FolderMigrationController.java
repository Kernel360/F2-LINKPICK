package techpick.api.application.folder.controller;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import techpick.api.domain.folder.dto.FolderCommand;
import techpick.api.domain.folder.service.FolderMigrationService;
import techpick.security.annotation.LoginUserId;

@RestController
@RequiredArgsConstructor
public class FolderMigrationController {
	private final FolderMigrationService folderMigrationService;

	@GetMapping("/api/folders/{folderId}/export")
	public ResponseEntity<ByteArrayResource> exportFolder(@LoginUserId Long userId, @PathVariable Long folderId) {
		String exportResult = folderMigrationService.exportFolder(new FolderCommand.Export(userId, folderId));

		ByteArrayResource resource = new ByteArrayResource(exportResult.getBytes());

		HttpHeaders headers = new HttpHeaders();
		headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=exported-folder.html");
		headers.add(HttpHeaders.CONTENT_TYPE, "text/html; charset=UTF-8");

		return ResponseEntity
			.status(HttpStatus.OK)
			.headers(headers)
			.body(resource);
	}

	@GetMapping("/api/folders/export")
	public ResponseEntity<ByteArrayResource> exportUserFolder(@LoginUserId Long userId) {
		String exportResult = folderMigrationService.exportUserFolder(userId);

		ByteArrayResource resource = new ByteArrayResource(exportResult.getBytes());

		HttpHeaders headers = new HttpHeaders();
		headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=exported-folder.html");
		headers.add(HttpHeaders.CONTENT_TYPE, "text/html; charset=UTF-8");

		return ResponseEntity
			.status(HttpStatus.OK)
			.headers(headers)
			.body(resource);
	}
}
