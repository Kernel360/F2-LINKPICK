package baguni.api.application.ranking.dto;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import baguni.api.domain.link.dto.LinkInfo;
import baguni.core.dto.UrlWithCount;

@Mapper(
	componentModel = "spring",
	injectionStrategy = InjectionStrategy.CONSTRUCTOR,
	unmappedTargetPolicy = ReportingPolicy.ERROR
)
public interface RankingApiMapper {

	@Mapping(target = "url", source = "urlWithCount.url")
	LinkInfoWithCount toRankingWithLinkInfo(UrlWithCount urlWithCount, LinkInfo linkInfo);
}
