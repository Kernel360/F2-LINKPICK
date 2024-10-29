package kernel360.techpick.api.api.pick.dto;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import kernel360.techpick.api.domain.pick.dto.PickCommand;
import kernel360.techpick.api.domain.pick.dto.PickResult;

@Mapper(
	componentModel = "spring",
	injectionStrategy = InjectionStrategy.CONSTRUCTOR,
	unmappedTargetPolicy = ReportingPolicy.ERROR
)
public interface PickApiMapper {

	PickCommand.Read toReadCommand(Long userId, PickApiRequest.Read request);

	PickCommand.Create toCreateCommand(Long userId, PickApiRequest.Create request);

	PickCommand.Update toUpdateCommand(Long userId, PickApiRequest.Update request);

	PickCommand.Move toMoveCommand(Long userId, PickApiRequest.Move request);

	PickCommand.Delete toDeleteCommand(Long userId, PickApiRequest.Delete request);

	PickApiResponse toApiResponse(PickResult pickResult);
}
