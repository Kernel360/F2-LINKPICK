package techpick.api.application.sharedFolder.dto;

import java.util.List;

import jakarta.validation.constraints.NotNull;

public class SharedFolderApiRequest {

	public record Create(@NotNull String name, List<Long> folderIdList) {
	}
}
