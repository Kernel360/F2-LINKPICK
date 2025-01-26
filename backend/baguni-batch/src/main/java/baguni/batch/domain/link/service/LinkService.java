package baguni.batch.domain.link.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import baguni.domain.model.link.Link;
import baguni.domain.infrastructure.link.LinkDataHandler;
import baguni.domain.infrastructure.link.dto.LinkMapper;
import baguni.domain.infrastructure.link.dto.LinkResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class LinkService {

	private final LinkDataHandler linkDataHandler;
	private final LinkAnalyzer linkAnalyzer;
	private final LinkMapper linkMapper;

	@Transactional(readOnly = true)
	public LinkResult getLinkResultByUrl(String url) {
		Link link = linkDataHandler.getLink(url);
		return linkMapper.toLinkResult(link);
	}

	@Transactional
	public void analyzeAndUpdateLink(String url) {
		Link link = linkDataHandler.getLink(url);
		LinkAnalyzeResult result = linkAnalyzer.analyze(url);
		link.updateMetadata(result.title(), result.description(), result.imageUrl());
	}
}
