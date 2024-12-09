package techpick.api.application.ranking.dto;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import techpick.api.domain.link.dto.LinkInfo;
import techpick.core.dto.UrlWithCount;

@Mapper(
	componentModel = "spring",
	injectionStrategy = InjectionStrategy.CONSTRUCTOR,
	unmappedTargetPolicy = ReportingPolicy.ERROR
)
public interface RankingApiMapper {

	@Mapping(target = "url", source = "urlWithCount.url")
	LinkInfoWithViewCount toRankingWithLinkInfo(UrlWithCount urlWithCount, LinkInfo linkInfo);
}
