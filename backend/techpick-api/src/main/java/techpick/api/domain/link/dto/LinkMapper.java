package techpick.api.domain.link.dto;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import techpick.core.model.link.Link;

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
}
