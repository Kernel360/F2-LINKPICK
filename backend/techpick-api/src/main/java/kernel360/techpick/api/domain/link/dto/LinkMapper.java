package kernel360.techpick.api.domain.link.dto;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import kernel360.techpick.core.model.link.Link;

@Mapper(
	componentModel = "spring",
	injectionStrategy = InjectionStrategy.CONSTRUCTOR,
	unmappedTargetPolicy = ReportingPolicy.ERROR
)
public interface LinkMapper {

	@Mapping(target = "invalidatedAt", ignore = true)
	Link of(LinkInfo linkInfo);

	LinkInfo of(Link link);
}
