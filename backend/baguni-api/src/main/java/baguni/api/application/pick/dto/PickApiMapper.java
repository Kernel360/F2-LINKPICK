package baguni.api.application.pick.dto;

import java.util.List;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;

import baguni.api.domain.pick.dto.PickCommand;
import baguni.api.domain.pick.dto.PickResult;

@Mapper(
	componentModel = "spring",
	injectionStrategy = InjectionStrategy.CONSTRUCTOR,
	unmappedTargetPolicy = ReportingPolicy.ERROR
)
public interface PickApiMapper {

	PickCommand.Read toReadCommand(Long userId, PickApiRequest.Read request);

	PickCommand.ReadList toReadListCommand(Long userId, List<Long> folderIdList);

	PickCommand.Search toSearchCommand(Long userId, PickApiRequest.Search request);

	PickCommand.SearchPagination toSearchPaginationCommand(Long userId, List<Long> folderIdList,
		List<String> searchTokenList, List<Long> tagIdList, Long cursor, Integer size);

	PickCommand.Create toCreateCommand(Long userId, PickApiRequest.Create request);

	PickCommand.Update toUpdateCommand(Long userId, PickApiRequest.Update request);

	PickCommand.Move toMoveCommand(Long userId, PickApiRequest.Move request);

	PickCommand.Delete toDeleteCommand(Long userId, PickApiRequest.Delete request);

	PickApiResponse.PickWithViewCount toApiResponseWithPickViewCount(PickResult.PickWithViewCount pickResult);

	PickApiResponse.Pick toApiResponse(PickResult.Pick pickResult);

	@Mapping(target = "pickList", source = "pickList", qualifiedByName = "mapPickList")
	PickApiResponse.FolderPickList toApiFolderPickList(PickResult.FolderPickList folderPickList);

	@Named("mapPickList")
	default List<PickApiResponse.Pick> mapPickList(List<PickResult.Pick> pickList) {
		return pickList.stream()
					   .map(this::toApiResponse)
					   .toList();
	}

	@Mapping(target = "pickList", source = "pickList", qualifiedByName = "mapPickListWithViewCount")
	PickApiResponse.FolderPickListWithViewCount toApiFolderPickListWithViewCount(
		PickResult.FolderPickWithViewCountList folderPickList);

	@Named("mapPickListWithViewCount")
	default List<PickApiResponse.PickWithViewCount> mapPickListWithViewCount(
		List<PickResult.PickWithViewCount> pickList) {
		return pickList.stream()
					   .map(this::toApiResponseWithPickViewCount)
					   .toList();
	}

	default Slice<PickApiResponse.Pick> toSliceApiResponse(Slice<PickResult.Pick> source) {
		List<PickApiResponse.Pick> convertedContent = source.getContent().stream()
															.map(this::toApiResponse)
															.toList();
		return new SliceImpl<>(convertedContent, source.getPageable(), source.hasNext());
	}
}
