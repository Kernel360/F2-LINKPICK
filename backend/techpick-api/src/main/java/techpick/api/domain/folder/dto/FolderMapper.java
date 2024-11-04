package techpick.api.domain.folder.dto;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import techpick.core.model.folder.Folder;
import techpick.core.model.user.User;

@Mapper(
	componentModel = "spring",
	injectionStrategy = InjectionStrategy.CONSTRUCTOR,
	unmappedTargetPolicy = ReportingPolicy.ERROR
)
public interface FolderMapper {

	@Mapping(source = "id", target = "id")
	@Mapping(source = "parentFolder.id", target = "parentFolderId")
	@Mapping(source = "user.id", target = "userId")
	@Mapping(source = "childFolderOrderList", target = "childFolderList")
	@Mapping(source = "childPickOrderList", target = "childPickList")
	FolderResult toResult(Folder folder);

}
