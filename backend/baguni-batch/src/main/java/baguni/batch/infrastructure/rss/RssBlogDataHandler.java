package baguni.batch.infrastructure.rss;

import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import baguni.domain.model.rss.RssBlog;
import baguni.domain.infrastructure.rss.RssBlogRepository;

@Component
@RequiredArgsConstructor
public class RssBlogDataHandler {

	private final RssBlogRepository rssBlogRepository;

	@Transactional(readOnly = true)
	public List<RssBlog> getAllBlogs() {
		return rssBlogRepository.findAll();
	}
}
