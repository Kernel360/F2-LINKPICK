package baguni.domain.infrastructure.link.dto;

import java.util.List;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

import baguni.domain.model.link.Link;

@Mapper(
	componentModel = "spring",
	injectionStrategy = InjectionStrategy.CONSTRUCTOR,
	unmappedTargetPolicy = ReportingPolicy.ERROR
)
public interface LinkMapper {

	@Mapping(target = "invalidatedAt", ignore = true)
	@Mapping(target = "title", source = "title", defaultValue = "")
	@Mapping(target = "description", source = "description", defaultValue = "")
	@Mapping(target = "imageUrl", source = "imageUrl", defaultValue = "")
	Link of(LinkInfo linkInfo);

	LinkInfo of(Link link);

	LinkResult toLinkResult(Link link);

	@Named("toLinkInfoList")
	LinkInfo toLinkInfo(Link link);

	@IterableMapping(qualifiedByName = "toLinkInfoList")
	List<LinkInfo> toLinkInfoList(List<Link> links);
}
