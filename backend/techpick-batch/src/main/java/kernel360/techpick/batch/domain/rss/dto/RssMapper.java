package kernel360.techpick.batch.domain.rss.dto;

import java.util.List;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

import kernel360.techpick.core.model.rss.RssBlog;
import kernel360.techpick.core.model.rss.RssFeed;

@Mapper(
	componentModel = "spring",
	injectionStrategy = InjectionStrategy.CONSTRUCTOR,
	unmappedTargetPolicy = ReportingPolicy.ERROR
)
public interface RssMapper {

	@Named("joinCategories")
	default String joinCategories(List<String> categories) {
		return categories != null ? String.join(",", categories) : null;
	}

	@Mapping(target = "joinedCategory", source = "item.category", qualifiedByName = "joinCategories")
	@Mapping(target = "rssBlogId", source = "blog.id")
	@Mapping(target = "publishedAt", source = "item.pubDate")
	@Mapping(target = "url", source = "item.link")
	RssFeed toRssFeed(RssBlog blog, RssRawFeed.Item item);

	RssBlog toRssBlog(RssBlogCommand.Create command);

	RssBlogResult toRssResult(RssBlog blog);
}
