package kernel360.techpick.feature.infrastructure.link;

import java.util.Optional;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import kernel360.techpick.core.model.link.Link;
import kernel360.techpick.core.model.link.LinkRepository;
import kernel360.techpick.feature.domain.link.dto.LinkInfo;
import kernel360.techpick.feature.domain.link.dto.LinkMapper;
import kernel360.techpick.feature.domain.link.exception.ApiLinkException;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class LinkDataHandler {
	private final LinkRepository linkRepository;
	private final LinkMapper linkMapper;

	@Transactional(readOnly = true)
	public Link getLink(String url) {
		return linkRepository.findByUrl(url).orElseThrow(ApiLinkException::LINK_NOT_FOUND);
	}

	@Transactional
	public Link saveLink(LinkInfo info) {
		Optional<Link> link = linkRepository.findByUrl(info.url());
		if (link.isPresent()) {
			link.get().updateMetadata(info.title(), info.description(), info.imageUrl());
			return link.get();
		}
		return linkRepository.save(linkMapper.of(info));
	}
}
