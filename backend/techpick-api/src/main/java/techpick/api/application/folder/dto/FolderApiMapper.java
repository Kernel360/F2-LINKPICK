package techpick.api.application.folder.dto;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import techpick.api.domain.folder.dto.FolderCommand;
import techpick.api.domain.folder.dto.FolderResult;

@Mapper(
    componentModel = "spring",
    injectionStrategy = InjectionStrategy.CONSTRUCTOR,
    unmappedTargetPolicy = ReportingPolicy.ERROR
)
public interface FolderApiMapper {
    FolderCommand.Create toCreateCommand(Long userId, FolderApiRequest.Create request);

    FolderCommand.Update toUpdateCommand(Long userId, FolderApiRequest.Update request);

    FolderCommand.Move toMoveCommand(Long userId, FolderApiRequest.Move request);

    FolderCommand.Delete toDeleteCommand(Long userId, FolderApiRequest.Delete request);

    @Mapping(target = "accessToken", expression = "java(null)")
    FolderApiResponse toApiResponse(FolderResult result);

    FolderApiResponse toApiResponse(FolderResult result, String accessToken);
}
