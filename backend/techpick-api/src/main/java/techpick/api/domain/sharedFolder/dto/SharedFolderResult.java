package techpick.api.domain.sharedFolder.dto;

import java.time.LocalDateTime;
import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import techpick.api.domain.folder.dto.FolderResult;
import techpick.api.domain.link.dto.LinkInfo;

public class SharedFolderResult {

    public record Create(
        String folderAccessToken
    ) {
    }

    // TODO: 추후 공유자의 정보까지 DTO에 담아주는게 좋겠다.
    public record Read(
        FolderResult sourceFolder,
        String folderAccessToken
    ) {
    }

    // 폴더, 태그, 픽이 모두 포함되서 반환
    @Builder
    public record SharedFolderInfo(
        String folderName,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        List<SharedPickInfo> pickList,
        @Schema(description = "해당 폴더 내에서 사용된 모든 태그들 정보. tagIdxList의 각 값을 index로 사용하세요.", example = "[0, 5, 2, 3]")
        List<SharedTagInfo> tagList
    ) {
    }

    // id 같은 예민한 값을 모두 제외한 DTO
    @Builder
    public record SharedPickInfo(
        @Schema(example = "자바 레코드 참고 블로그 1")
        String title,
        LinkInfo linkInfo,
        @Schema(description = "tagList.get(idx) 로 태그 정보를 획득할 수 있습니다.", example = "[0, 5, 2, 3]")
        List<Integer> tagIdxList,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
    ) {
    }

    // id 같은 예민한 값을 모두 제외한 DTO
    @Builder
    public record SharedTagInfo(
        String name,
        Integer colorNumber
    ) {
    }
}