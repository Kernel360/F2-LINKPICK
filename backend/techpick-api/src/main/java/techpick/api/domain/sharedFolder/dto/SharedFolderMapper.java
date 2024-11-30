package techpick.api.domain.sharedFolder.dto;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import techpick.api.application.sharedFolder.dto.SharedFolderApiResponse;
import techpick.api.domain.folder.dto.FolderMapper;
import techpick.api.domain.folder.dto.FolderResult;
import techpick.core.model.folder.Folder;
import techpick.core.model.pick.Pick;
import techpick.core.model.sharedFolder.SharedFolder;
import techpick.core.model.tag.Tag;

@Mapper(
    componentModel = "spring",
    injectionStrategy = InjectionStrategy.CONSTRUCTOR,
    unmappedTargetPolicy = ReportingPolicy.ERROR,
    uses = FolderMapper.class
)
public interface SharedFolderMapper {

    @Mapping(expression = "java(sharedFolder.getId().toString())", target = "folderAccessToken")
    SharedFolderResult.Create toCreateResult(SharedFolder sharedFolder);

    @Mapping(source = "folder", target = "sourceFolder")
    @Mapping(expression = "java(sharedFolder.getId().toString())", target = "folderAccessToken")
    SharedFolderResult.Read toReadResult(SharedFolder sharedFolder);

    SharedFolderResult.SharedTagInfo toSharedTagInfo(Tag tag);
}
