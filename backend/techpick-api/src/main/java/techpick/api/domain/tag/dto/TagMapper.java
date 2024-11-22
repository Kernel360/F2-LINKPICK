package techpick.api.domain.tag.dto;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import techpick.core.model.tag.Tag;
import techpick.core.model.user.User;

@Mapper(
	componentModel = "spring",
	injectionStrategy = InjectionStrategy.CONSTRUCTOR,
	unmappedTargetPolicy = ReportingPolicy.ERROR
)
public interface TagMapper {

	@Mapping(source = "tag.user.id", target = "userId")
	TagResult toResult(Tag tag);

	Tag toEntity(TagCommand.Create create, User user);
}
