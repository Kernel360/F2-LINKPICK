package baguni.api.domain.sharedFolder.dto;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import baguni.api.application.sharedFolder.dto.SharedFolderApiResponse;
import baguni.api.domain.folder.dto.FolderMapper;
import baguni.api.domain.folder.dto.FolderResult;
import baguni.core.model.folder.Folder;
import baguni.core.model.pick.Pick;
import baguni.core.model.sharedFolder.SharedFolder;
import baguni.core.model.tag.Tag;

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
