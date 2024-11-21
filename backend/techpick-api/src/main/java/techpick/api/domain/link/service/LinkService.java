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
import techpick.api.infrastructure.link.LinkDataHandler;
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
			String html = getJsoupResponse(url).body();

			Document document = Jsoup.parse(html);

			String title = getTitle(document);
			String description = getMetaContent(document, "og:description");
			String imageUrl = correctImageUrl(url, getMetaContent(document, "og:image"));

			link.updateMetadata(title, description, imageUrl);
			linkDataHandler.saveLink(link);
		} catch (Exception e) {
			log.info("url : {} 의 og tag 추출에 실패했습니다.", url);
		}
	}

	@Transactional
	public LinkResult getUpdateOgTag(String url) {
		Link link = linkDataHandler.getOptionalLink(url).orElseGet(() -> Link.createLinkByUrl(url));
		try {
			String html = getJsoupResponse(url).body();

			Document document = Jsoup.parse(html);

			String title = getTitle(document);
			String description = getMetaContent(document, "og:description");
			String imageUrl = correctImageUrl(url, getMetaContent(document, "og:image"));

			link.updateMetadata(title, description, imageUrl);
			return linkMapper.toLinkResult(linkDataHandler.saveLink(link));
		} catch (Exception e) {
			log.info("url : {} 의 og tag 추출에 실패했습니다.", url);
		}
		return linkMapper.toLinkResult(link);
	}

	private Connection.Response getJsoupResponse(String url) throws IOException {
		return Jsoup.connect(url)
			.userAgent(
				"Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1667.0 Safari/537.36")
			.header("scheme", "https")
			.header("accept",
				"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8")
			.header("accept-language", "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,es;q=0.6")
			.header("cache-control", "no-cache")
			.header("pragma", "no-cache")
			.header("upgrade-insecure-requests", "1")
			.execute();
	}

	/**
	 * meta tag 에서 정보 가져옴. 존재하지 않으면 빈 스트링("") 반환
	 * */
	private String getMetaContent(Document document, String propertyName) {
		Element metaTag = document.selectFirst("meta[property=" + propertyName + "]");
		return metaTag != null ? metaTag.attr("content") : "";
	}

	/**
	 * og:title 이 존재하지 않으면 title 태그에서 가져옴
	 * title 태그 또한 존재하지 않으면 빈스트링("") 반환
	 * */
	private String getTitle(Document document) {
		String title = getMetaContent(document, "og:title");
		if (title.isEmpty()) {
			title = document.title();
		}
		return title;
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
