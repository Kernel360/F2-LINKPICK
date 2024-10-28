package kernel360.techpick.api.domain.pick.dto;

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
	PickResult toCreateResult(Pick pick);

	@Mapping(source = "pick.link", target = "linkInfo")
	PickResult toReadResult(Pick pick);

	@Mapping(source = "pick.link", target = "linkInfo")
	PickResult toUpdateResult(Pick pick);

	@Mapping(source = "pick.link", target = "linkInfo")
	PickResult toMoveResult(Pick pick);

	@Mapping(source = "command.title", target = "title")
	Pick toEntity(PickCommand.Create command, User user, Folder parentFolder, Link link);
}
