package baguni.domain.infrastructure.link;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import baguni.domain.exception.link.ApiLinkException;
import baguni.domain.model.link.Link;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class LinkDataHandler {
	private final LinkRepository linkRepository;

	@Transactional(readOnly = true)
	public Link getLink(String url) {
		return linkRepository.findByUrl(url).orElseThrow(ApiLinkException::LINK_NOT_FOUND);
	}

	@Transactional(readOnly = true)
	public Optional<Link> getOptionalLink(String url) {
		return linkRepository.findByUrl(url);
	}

	@Transactional(readOnly = true)
	public Optional<Link> getOptionalLinkById(Long id) {
		return linkRepository.findById(id);
	}

	@Transactional
	public Link saveLink(Link link) {
		return linkRepository.save(link);
	}

	@Transactional(readOnly = true)
	public boolean existsByUrl(String url) {
		return linkRepository.existsByUrl(url);
	}

	@Transactional(readOnly = true)
	public List<Link> getRssLinkList(int limit) {
		return linkRepository.findAllRssBlogArticlesOrderByPublishedDate(
			PageRequest.of(0, limit)
		);
	}
}
