package baguni.api.domain.pick.dto;

import java.util.List;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import baguni.core.model.folder.Folder;
import baguni.core.model.link.Link;
import baguni.core.model.pick.Pick;
import baguni.core.model.pick.PickRepository;
import baguni.core.model.user.User;

@Mapper(
	componentModel = "spring",
	injectionStrategy = InjectionStrategy.CONSTRUCTOR,
	unmappedTargetPolicy = ReportingPolicy.ERROR
)
public interface PickMapper {

	@Mapping(source = "pick.link", target = "linkInfo")
	@Mapping(source = "pick.parentFolder.id", target = "parentFolderId")
	PickResult.Pick toPickResult(Pick pick);

	PickResult.PickWithViewCount toPickResultWithViewCount(PickResult.Pick pickResult, Boolean isHot,
		Long weeklyViewCount);

	@Mapping(source = "folderId", target = "folderId")
	@Mapping(source = "pick", target = "pickList")
	PickResult.FolderPickWithViewCountList toPickResultList(Long folderId, List<PickResult.PickWithViewCount> pick);

	@Mapping(source = "command.title", target = "title")
	@Mapping(source = "parentFolder", target = "parentFolder")
	@Mapping(source = "user", target = "user")
	@Mapping(source = "command.tagIdOrderedList", target = "tagIdOrderedList")
	Pick toEntity(PickCommand.Create command, User user, Folder parentFolder, Link link);
}
