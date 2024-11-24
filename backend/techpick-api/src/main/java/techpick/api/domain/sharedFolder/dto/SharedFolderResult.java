package techpick.api.domain.sharedFolder.dto;

import java.util.UUID;

import lombok.Builder;

public class SharedFolderResult {

	@Builder
	public static record Folder(UUID uuid, String jsonData) {
	}

	@Builder
	public static record List(UUID uuid) {

	}

}