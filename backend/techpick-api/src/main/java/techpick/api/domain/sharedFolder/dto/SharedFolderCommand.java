package techpick.api.domain.sharedFolder.dto;

import java.util.List;
import java.util.UUID;

public class SharedFolderCommand {

    public record Create(
        Long userId,
        Long folderId
    ) {
    }

    public record Delete(
        Long userId,
        UUID uuid
    ) {
    }
}
