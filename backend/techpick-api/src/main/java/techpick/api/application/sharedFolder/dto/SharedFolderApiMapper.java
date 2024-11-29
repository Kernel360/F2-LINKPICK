package techpick.api.application.sharedFolder.dto;

import java.util.List;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

import techpick.api.domain.sharedFolder.dto.SharedFolderCommand;
import techpick.api.domain.sharedFolder.dto.SharedFolderResult;

@Mapper(
    componentModel = "spring",
    injectionStrategy = InjectionStrategy.CONSTRUCTOR,
    unmappedTargetPolicy = ReportingPolicy.ERROR
)
public interface SharedFolderApiMapper {

    SharedFolderCommand.Create toCreateCommand(Long userId, SharedFolderApiRequest.Create request);

    // 공유 폴더 생성
    SharedFolderApiResponse.Create toCreateResponse(SharedFolderResult.Create result);

    // 내 공유된 폴더 목록 획득
    @Named("singlePartialReadMapping")
    @Mapping(source = "sourceFolder.createdAt", target = "createdAt")
    @Mapping(source = "sourceFolder.updatedAt", target = "updatedAt")
    @Mapping(source = "sourceFolder.name", target = "folderName")
    SharedFolderApiResponse.ReadFolderPartial toReadResponse(SharedFolderResult.Read result);

    @IterableMapping(qualifiedByName = "singlePartialReadMapping")
    List<SharedFolderApiResponse.ReadFolderPartial> toReadResponseList(List<SharedFolderResult.Read> result);

    SharedFolderApiResponse.ReadFolderFull toReadFolderFullResponse(SharedFolderResult.SharedFolderInfo result);
}
