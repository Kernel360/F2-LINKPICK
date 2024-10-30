package techpick.batch.domain.rss.service;

import java.util.List;

import techpick.batch.domain.rss.dto.RssBlogCommand;
import techpick.batch.domain.rss.dto.RssBlogResult;

public interface RssService {

	RssBlogResult saveRssBlog(RssBlogCommand.Create command);

	List<RssBlogResult> getAllRssBlog();
}
