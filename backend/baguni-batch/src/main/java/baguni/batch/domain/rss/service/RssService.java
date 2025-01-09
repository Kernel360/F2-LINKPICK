package baguni.batch.domain.rss.service;

import java.util.List;

import baguni.batch.domain.rss.dto.RssBlogCommand;
import baguni.batch.domain.rss.dto.RssBlogResult;

public interface RssService {

	RssBlogResult saveRssBlog(RssBlogCommand.Create command);

	List<RssBlogResult> getAllRssBlog();
}
