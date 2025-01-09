package baguni.api.infrastructure.link;

import java.util.Optional;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import baguni.entity.model.link.Link;
import baguni.entity.model.link.LinkRepository;
import lombok.RequiredArgsConstructor;
import baguni.api.service.link.exception.ApiLinkException;

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

	@Transactional
	public Link saveLink(Link link) {
		return linkRepository.save(link);
	}

	@Transactional(readOnly = true)
	public boolean existsByUrl(String url) {
		return linkRepository.existsByUrl(url);
	}
}
