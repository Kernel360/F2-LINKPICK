package techpick.api.application.sharedFolder.dto;

public class SharedFolderApiRequest {

    public record Create(
        Long folderId
    ) {
    }

    public record Update(
    ) {
        // TODO: 권한 업데이트에 해당
    }
}
