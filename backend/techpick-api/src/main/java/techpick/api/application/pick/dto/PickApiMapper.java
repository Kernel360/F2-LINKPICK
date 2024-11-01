package techpick.api.application.pick.dto;

import java.util.List;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import techpick.api.domain.pick.dto.PickCommand;
import techpick.api.domain.pick.dto.PickResult;

@Mapper(
	componentModel = "spring",
	injectionStrategy = InjectionStrategy.CONSTRUCTOR,
	unmappedTargetPolicy = ReportingPolicy.ERROR
)
public interface PickApiMapper {

	PickCommand.Read toReadCommand(Long userId, PickApiRequest.Read request);

	PickCommand.Search toSearchCommand(Long userId, List<Long> folderIdList, List<String> searchTokenList);

	PickCommand.Create toCreateCommand(Long userId, PickApiRequest.Create request);

	PickCommand.Update toUpdateCommand(Long userId, PickApiRequest.Update request);

	PickCommand.Move toMoveCommand(Long userId, PickApiRequest.Move request);

	PickCommand.Delete toDeleteCommand(Long userId, PickApiRequest.Delete request);

	PickApiResponse.Pick toApiResponse(PickResult.Pick pickResult);

	default PickApiResponse.Fetch toApiFetchResponse(List<PickResult.PickList> pickList) {
		return new PickApiResponse.Fetch(pickList);
	}
}
