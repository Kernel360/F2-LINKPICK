package kernel360.techpick.api.infrastructure.link.writer;

import java.util.Optional;

import org.springframework.stereotype.Component;

import jakarta.transaction.Transactional;
import kernel360.techpick.core.model.link.Link;
import kernel360.techpick.core.model.link.LinkRepository;
import kernel360.techpick.api.domain.link.dto.LinkInfo;
import kernel360.techpick.api.domain.link.dto.LinkMapper;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class LinkWriterImpl implements LinkWriter {
	private final LinkRepository linkRepository;
	private final LinkMapper linkMapper;

	@Override
	@Transactional
	public Link writeLink(LinkInfo info) {
		Optional<Link> link = linkRepository.findByUrl(info.url());
		if (link.isPresent()) {
			link.get().updateMetadata(info.title(), info.description(), info.imageUrl());
			return link.get();
		}
		return linkRepository.save(linkMapper.of(info));
	}
}
