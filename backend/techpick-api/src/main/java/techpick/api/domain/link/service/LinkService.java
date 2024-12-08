package techpick.api.domain.link.service;

import java.io.IOException;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import techpick.api.domain.link.dto.LinkMapper;
import techpick.api.domain.link.dto.LinkResult;
import techpick.api.domain.link.exception.ApiLinkException;
import techpick.api.infrastructure.link.LinkDataHandler;
import techpick.api.lib.opengraph.Metadata;
import techpick.api.lib.opengraph.OpenGraph;
import techpick.core.model.link.Link;

@Service
@RequiredArgsConstructor
@Slf4j
public class LinkService {

	private final LinkDataHandler linkDataHandler;
	private final LinkMapper linkMapper;

	@Transactional
	public void updateOgTag(String url) {
		Link link = linkDataHandler.getOptionalLink(url).orElseGet(() -> Link.createLinkByUrl(url));
		try {
			var openGraph = new OpenGraph(url);
			link.updateMetadata(
				openGraph.getTag(Metadata.TITLE).orElse(""),
				openGraph.getTag(Metadata.DESCRIPTION).orElse(""),
				correctImageUrl(url, openGraph.getTag(Metadata.IMAGE).orElse(""))
			);
			linkDataHandler.saveLink(link);
		} catch (Exception e) {
			log.info("url : {} 의 og tag 추출에 실패했습니다.", url, e);
		}
	}

	@Transactional
	public LinkResult getUpdateOgTag(String url) {
		Link link = linkDataHandler.getOptionalLink(url).orElseGet(() -> Link.createLinkByUrl(url));
		try {
			var openGraph = new OpenGraph(url);
			link.updateMetadata(
				openGraph.getTag(Metadata.TITLE).orElse(""),
				openGraph.getTag(Metadata.DESCRIPTION).orElse(""),
				correctImageUrl(url, openGraph.getTag(Metadata.IMAGE).orElse(""))
			);
			return linkMapper.toLinkResult(linkDataHandler.saveLink(link));
		} catch (Exception e) {
			throw ApiLinkException.LINK_OG_TAG_UPDATE_FAILURE();
		}
	}

	/**
	 * og:image 가 완전한 url 형식이 아닐 수 있어 보정
	 * 추론 불가능한 image url 일 경우 빈스트링("")으로 대치
	 * */
	private String correctImageUrl(String baseUrl, String imageUrl) {
		if (imageUrl.startsWith("://")) {
			return "https" + imageUrl;
		}
		if (imageUrl.startsWith("//")) {
			return "https:" + imageUrl;
		}
		if (imageUrl.startsWith("/")) {
			return baseUrl + imageUrl;
		}
		if (!imageUrl.startsWith("https://")) {
			return "";
		}
		return imageUrl;
	}
}
