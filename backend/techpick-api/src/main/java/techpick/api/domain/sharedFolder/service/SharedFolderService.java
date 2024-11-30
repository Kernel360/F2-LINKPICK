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
import techpick.api.domain.sharedFolder.dto.SharedFolderMapper;
import techpick.api.domain.sharedFolder.dto.SharedFolderResult;
import techpick.api.domain.sharedFolder.exception.ApiSharedFolderException;
import techpick.api.infrastructure.folder.FolderDataHandler;
import techpick.api.infrastructure.pick.PickDataHandler;
import techpick.api.infrastructure.sharedFolder.SharedFolderDataHandler;
import techpick.api.infrastructure.tag.TagDataHandler;
import techpick.core.model.folder.Folder;
import techpick.core.model.folder.FolderType;
import techpick.core.model.pick.Pick;
import techpick.core.model.sharedFolder.SharedFolder;

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
    public SharedFolderResult.Create createSharedFolder(Long userId, Long sourceFolderId) {
        var folder = folderDataHandler.getFolder(sourceFolderId);
        validateUserIsFolderOwner(userId, folder);
        validateFolderIsNotShared(folder);
        validateFolderIsGeneralType(folder);
        var sharedFolder = sharedFolderDataHandler.save(userId, sourceFolderId);
        return sharedFolderMapper.toCreateResult(sharedFolder);
    }

    /**
     * @author minkyeu kim
     * 지금 코드가 복잡한데, 반드시 추후 리팩토링 진행해야 한다.
     * 일단 DB에서 최신 정보를 끌어오지만, Update가 자주 일어나지 않는다는 가정 하에
     * 정보를 캐싱해두는 쪽으로 개선할 수 있을 듯 하다.
     *
     * @implNote
     * 폴더 내 Tag 정보 리스트를 두고, 그 리스트의 index로 픽의 태그를 표현한다.
     * Ex. tagList = { "foo", "bar", "hi" } 일 때
     *     pick.tagIdxList = [0, 2, 1] 이면
     *     pick에 설정된 태그는 [ "foo", "hi", "bar" ] 이다.
     */
    @Transactional(readOnly = true)
    public SharedFolderResult.SharedFolderInfo getSharedFolderInfo(UUID uuid) {
        var sourceFolder = sharedFolderDataHandler.getByUUID(uuid).getFolder();
        var pickList = pickDataHandler.getPickList(sourceFolder.getChildPickIdOrderedList());
        var alternativeTagIdMap = createAlternativeTagIdMap(pickList);

        return SharedFolderResult.SharedFolderInfo
            .builder()
            .folderName(sourceFolder.getName())
            .createdAt(sourceFolder.getCreatedAt())
            .updatedAt(sourceFolder.getUpdatedAt())
            .pickList(createSharedPickList(pickList, alternativeTagIdMap))
            .tagList(createSharedTagList(alternativeTagIdMap))
            .build();
    }

    @Transactional(readOnly = true)
    public Optional<String> findFolderAccessTokenByFolderId(Long folderId) {
        return sharedFolderDataHandler.findUUIDBySourceFolderId(folderId).map(UUID::toString);
    }

    @Transactional(readOnly = true)
    public List<SharedFolderResult.Read> getSharedFolderListByUserId(Long userId) {
        return sharedFolderDataHandler.getByUserId(userId).stream()
                                      .map(sharedFolderMapper::toReadResult).toList();
    }

    @Transactional
    public void deleteSharedFolder(Long userId, Long sourceFolderId) {
        SharedFolder sharedFolder = sharedFolderDataHandler.getByFolderId(sourceFolderId);
        validateUserIsSharedFolderOwner(userId, sharedFolder);
        sharedFolderDataHandler.deleteBySourceFolderId(sourceFolderId);
    }

    private void validateFolderIsNotShared(Folder folder) {
        if (sharedFolderDataHandler.isSharedFolder(folder.getId())) {
            throw ApiSharedFolderException.FOLDER_ALREADY_SHARED();
        }
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

    private void validateFolderIsGeneralType(Folder folder) {
        if (!folder.getFolderType().equals(FolderType.GENERAL)) {
            throw ApiSharedFolderException.FOLDER_CANNOT_BE_SHARED();
        }
    }

    private Map<Long, Integer> createAlternativeTagIdMap(List<Pick> pickList) {
        Map<Long, Integer> alternativeIdMap = new HashMap<>();
        for (var pick : pickList) {
            for (var tagId : pick.getTagIdOrderedList()) {
                if (!alternativeIdMap.containsKey(tagId)) {
                    var nextId = alternativeIdMap.size(); // (0~N) incremental value
                    alternativeIdMap.put(tagId, nextId);
                }
            }
        }
        return alternativeIdMap;
    }

    private List<SharedFolderResult.SharedTagInfo> createSharedTagList(Map<Long, Integer> alternativeTagIdMap) {
        var matchingTagList = tagDataHandler.getTagList(alternativeTagIdMap.keySet().stream().toList());
        var initialSize = alternativeTagIdMap.size();
        List<SharedFolderResult.SharedTagInfo> sharedTagInfoList = new ArrayList<>(initialSize);
        for (var tag : matchingTagList) {
            var newId = alternativeTagIdMap.get(tag.getId());
            var sharedTagInfo = sharedFolderMapper.toSharedTagInfo(tag);
            sharedTagInfoList.add(newId, sharedTagInfo);
        }
        return sharedTagInfoList;
    }

    private List<SharedFolderResult.SharedPickInfo> createSharedPickList(
        List<Pick> pickList,
        Map<Long, Integer> alternativeTagIdMap
    ) {
        return pickList
            .stream()
            .map((pick) ->
                SharedFolderResult.SharedPickInfo
                    .builder()
                    .title(pick.getTitle())
                    .linkInfo(linkMapper.of(pick.getLink()))
                    .tagIdxList(pick.getTagIdOrderedList().stream().map(alternativeTagIdMap::get).toList())
                    .createdAt(pick.getCreatedAt())
                    .updatedAt(pick.getUpdatedAt())
                    .build()
            ).toList();
    }
}
