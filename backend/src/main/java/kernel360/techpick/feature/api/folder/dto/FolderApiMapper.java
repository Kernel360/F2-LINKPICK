package kernel360.techpick.feature.api.folder.dto;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import kernel360.techpick.feature.domain.folder.dto.FolderCommand;
import kernel360.techpick.feature.domain.folder.dto.FolderResult;

@Mapper(
	componentModel = "spring",
	injectionStrategy = InjectionStrategy.CONSTRUCTOR,
	unmappedTargetPolicy = ReportingPolicy.ERROR
)
public interface FolderApiMapper {
	FolderCommand.Create toCreateCommand(Long userId, FolderApiRequest.Create request);

	FolderCommand.Read toReadCommand(Long userId, Long folderId);

	FolderCommand.Update toUpdateCommand(Long userId, FolderApiRequest.Update request);

	FolderCommand.Move toMoveCommand(Long userId, FolderApiRequest.Move request);

	FolderCommand.Delete toDeleteCommand(Long userId, FolderApiRequest.Delete request);

	FolderApiResponse toApiResponse(FolderResult result);
}
