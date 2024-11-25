package techpick.api.domain.sharedFolder.dto;

import java.util.UUID;

import lombok.Builder;

public class SharedFolderResult {

	@Builder
	public record Folder(UUID uuid, String jsonData) {
	}

	@Builder
	public record List(UUID uuid) {

	}

}