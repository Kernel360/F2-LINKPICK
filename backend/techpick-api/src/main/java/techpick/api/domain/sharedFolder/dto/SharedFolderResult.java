package techpick.api.domain.sharedFolder.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import techpick.api.domain.folder.dto.FolderResult;
import techpick.api.domain.link.dto.LinkInfo;

public class SharedFolderResult {

    public record Create(
        String accessToken
    ) {
    }

    // TODO: 추후 공유자의 정보까지 DTO에 담아주는게 좋겠다.
    public record Read(
        FolderResult sourceFolder,
        String accessToken
    ) {
    }

    // 폴더, 태그, 픽이 모두 포함되서 반환
    @Builder
    public record SharedFolderInfo(
        String folderName,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        List<SharedPickInfo> pickList,
        Map<UUID, SharedTagInfo> tagIdMap
    ) {
    }

    // id 같은 예민한 값을 모두 제외한 DTO
    @Builder
    public record SharedPickInfo(
        @Schema(example = "자바 레코드 참고 블로그 1")
        String title,
        LinkInfo linkInfo,
        List<UUID> usedTagKeyList, // pick에 설정된 태그 키
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