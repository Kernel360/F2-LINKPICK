package kernel360.techpick.batch.domain.rss.service;

import java.util.List;

import kernel360.techpick.batch.domain.rss.dto.RssBlogCommand;
import kernel360.techpick.batch.domain.rss.dto.RssBlogResult;

public interface RssService {

	RssBlogResult saveRssBlog(RssBlogCommand.Create command);

	List<RssBlogResult> getAllRssBlog();
}
