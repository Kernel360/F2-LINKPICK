package kernel360.techpick.feature.domain.pick.dto;

import java.util.List;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import kernel360.techpick.core.model.folder.Folder;
import kernel360.techpick.core.model.link.Link;
import kernel360.techpick.core.model.pick.Pick;
import kernel360.techpick.core.model.user.User;

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
	PickResult.PickList toPickResultList(Long folderId, List<PickResult.Pick> pick);

	@Mapping(source = "command.title", target = "title")
	@Mapping(source = "parentFolder", target = "parentFolder")
	@Mapping(source = "user", target = "user")
	@Mapping(source = "command.tagOrderList", target = "tagOrderList")
	Pick toEntity(PickCommand.Create command, User user, Folder parentFolder, Link link);
}
