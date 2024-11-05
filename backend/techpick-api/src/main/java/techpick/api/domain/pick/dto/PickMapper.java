package techpick.api.domain.pick.dto;

import java.util.List;

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
	PickResult.Pick toPickResult(Pick pick);

	@Mapping(source = "folderId", target = "folderId")
	@Mapping(source = "pick", target = "pickList")
	PickResult.FolderPickList toPickResultList(Long folderId, List<PickResult.Pick> pick);

	@Mapping(source = "command.title", target = "title")
	@Mapping(source = "parentFolder", target = "parentFolder")
	@Mapping(source = "user", target = "user")
	@Mapping(source = "command.tagIdOrderedList", target = "tagIdOrderedList")
	Pick toEntity(PickCommand.Create command, User user, Folder parentFolder, Link link);
}
