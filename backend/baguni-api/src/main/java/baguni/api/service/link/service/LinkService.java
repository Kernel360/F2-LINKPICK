package baguni.api.service.link.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import baguni.entity.model.link.Link;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import baguni.entity.model.link.dto.LinkInfo;
import baguni.entity.model.link.dto.LinkMapper;
import baguni.entity.model.link.LinkDataHandler;

@Slf4j
@Service
@RequiredArgsConstructor
public class LinkService {

	private final LinkDataHandler linkDataHandler;
	private final LinkMapper linkMapper;

	@Transactional(readOnly = true)
	public LinkInfo getLinkInfo(String url) {
		Link link = linkDataHandler.getLink(url);
		return linkMapper.of(link);
	}

	@Transactional
	public LinkInfo saveLink(String url) {
		Link link = linkDataHandler.getOptionalLink(url).orElseGet(() -> Link.createLinkByUrl(url));
		return linkMapper.of(linkDataHandler.saveLink(link));
	}
}
