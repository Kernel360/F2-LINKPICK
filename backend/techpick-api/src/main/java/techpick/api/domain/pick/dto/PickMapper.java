package techpick.api.domain.pick.dto;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import techpick.core.model.folder.Folder;
import techpick.core.model.link.Link;
import techpick.core.model.pick.Pick;
import techpick.core.model.user.User;

@Mapper(
	componentModel = "spring",
	injectionStrategy = InjectionStrategy.CONSTRUCTOR,
	unmappedTargetPolicy = ReportingPolicy.ERROR
)
public interface PickMapper {

	@Mapping(source = "pick.link", target = "linkInfo")
	@Mapping(source = "pick.parentFolder.id", target = "parentFolderId")
	PickResult toPickResult(Pick pick);

	@Mapping(source = "command.title", target = "title")
	@Mapping(source = "parentFolder", target = "parentFolder")
	@Mapping(source = "user", target = "user")
	@Mapping(source = "command.tagOrderList", target = "tagOrderList")
	Pick toEntity(PickCommand.Create command, User user, Folder parentFolder, Link link);
}
