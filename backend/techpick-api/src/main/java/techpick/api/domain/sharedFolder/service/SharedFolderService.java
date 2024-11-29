package techpick.api.domain.sharedFolder.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import techpick.api.domain.folder.exception.ApiFolderException;
import techpick.api.domain.link.dto.LinkMapper;
import techpick.api.domain.sharedFolder.dto.SharedFolderCommand;
import techpick.api.domain.sharedFolder.dto.SharedFolderMapper;
import techpick.api.domain.sharedFolder.dto.SharedFolderResult;
import techpick.api.domain.sharedFolder.exception.ApiSharedFolderException;
import techpick.api.infrastructure.folder.FolderDataHandler;
import techpick.api.infrastructure.pick.PickDataHandler;
import techpick.api.infrastructure.sharedFolder.SharedFolderDataHandler;
import techpick.api.infrastructure.tag.TagDataHandler;
import techpick.core.model.folder.Folder;
import techpick.core.model.sharedFolder.SharedFolder;
import techpick.core.model.tag.Tag;

@Service
@RequiredArgsConstructor
public class SharedFolderService {

    private final SharedFolderDataHandler sharedFolderDataHandler;
    private final SharedFolderMapper sharedFolderMapper;

    private final FolderDataHandler folderDataHandler;
    private final TagDataHandler tagDataHandler;
    private final PickDataHandler pickDataHandler;

    private final LinkMapper linkMapper;

    @Transactional
    public SharedFolderResult.Create createSharedFolder(SharedFolderCommand.Create command) {
        var folder = folderDataHandler.getFolder(command.folderId());
        validateUserIsFolderOwner(command.userId(), folder);

        return sharedFolderMapper.toCreateResult(sharedFolderDataHandler.save(command.userId(), command.folderId()));
    }

    /**
     * @author minkyeu kim
     * 지금 코드가 복잡한데, 반드시 추후 리팩토링 진행해야 한다.
     * 일단 DB에서 최신 정보를 끌어오지만, Update가 자주 일어나지 않는다는 가정 하에
     * 정보를 캐싱해두는 쪽으로 개선할 수 있을 듯 하다.
     */
    @Transactional(readOnly = true)
    public SharedFolderResult.SharedFolderInfo getSharedFolderInfo(UUID uuid) {

        var sourceFolder = sharedFolderDataHandler.getByUUID(uuid).getFolder();
        var pickList = pickDataHandler.getPickList(sourceFolder.getChildPickIdOrderedList());

        Map<Long, UUID> tagIdAndKeyMap = new HashMap<>();
        for (var pick : pickList) {
            for (var tagId : pick.getTagIdOrderedList()) {
                if (!tagIdAndKeyMap.containsKey(tagId)) {
                    tagIdAndKeyMap.put(tagId, UUID.randomUUID());
                }
            }
        }

        Map<UUID, SharedFolderResult.SharedTagInfo> sharedTagInfoMap = new HashMap<>();
        List<Tag> usedTagList = tagDataHandler.getTagList(new ArrayList<>(tagIdAndKeyMap.keySet()));
        for (var tag : usedTagList) {
            var key = tagIdAndKeyMap.get(tag.getId());
            var sharedTagInfo = sharedFolderMapper.toSharedTagInfo(tag);
            sharedTagInfoMap.put(key, sharedTagInfo);
        }

        List<SharedFolderResult.SharedPickInfo> sharedPickInfoList = pickList
            .stream()
            .map((pick) ->
                SharedFolderResult.SharedPickInfo
                    .builder()
                    .title(pick.getTitle())
                    .linkInfo(linkMapper.of(pick.getLink()))
                    .usedTagKeyList(pick.getTagIdOrderedList().stream().map(tagIdAndKeyMap::get).toList())
                    .createdAt(pick.getCreatedAt())
                    .updatedAt(pick.getUpdatedAt())
                    .build()
            ).toList();

        return SharedFolderResult.SharedFolderInfo
            .builder()
            .folderName(sourceFolder.getName())
            .createdAt(sourceFolder.getCreatedAt())
            .updatedAt(sourceFolder.getUpdatedAt())
            .pickList(sharedPickInfoList)
            .tagIdMap(sharedTagInfoMap)
            .build();
    }

    @Transactional(readOnly = true)
    public Optional<String> findAccessTokenByFolderId(Long folderId) {
        return sharedFolderDataHandler.findUUIDBySourceFolderId(folderId).map(UUID::toString);
    }

    @Transactional(readOnly = true)
    public List<SharedFolderResult.Read> getSharedFolderListByUserId(Long userId) {
        return sharedFolderDataHandler.getByUserId(userId).stream()
                                      .map(sharedFolderMapper::toReadResult).toList();
    }

    @Transactional
    public void deleteSharedFolder(SharedFolderCommand.Delete command) {
        SharedFolder sharedFolder = sharedFolderDataHandler.getByUUID(command.uuid());
        validateUserIsSharedFolderOwner(command.userId(), sharedFolder);

        sharedFolderDataHandler.deleteByUUID(command.uuid());
    }

    private void validateUserIsFolderOwner(Long userId, Folder folder) {
        if (!folder.getUser().getId().equals(userId)) {
            throw ApiFolderException.FOLDER_ACCESS_DENIED();
        }
    }

    private void validateUserIsSharedFolderOwner(Long userId, SharedFolder sharedFolder) {
        if (!sharedFolder.getUser().getId().equals(userId)) {
            throw ApiSharedFolderException.SHARED_FOLDER_UNAUTHORIZED();
        }
    }
}
