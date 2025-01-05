package baguni.api.service.link.service;

import java.net.MalformedURLException;
import java.net.URL;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import baguni.api.service.link.dto.LinkResult;
import baguni.common.lib.opengraph.OpenGraphOption;
import baguni.common.lib.opengraph.OpenGraphReader;
import baguni.common.lib.opengraph.OpenGraphReaderJsoup;
import baguni.common.lib.opengraph.OpenGraphReaderSelenium;
import baguni.entity.model.link.Link;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import baguni.api.service.link.dto.LinkInfo;
import baguni.api.service.link.dto.LinkMapper;
import baguni.api.service.link.exception.ApiLinkException;
import baguni.api.infrastructure.link.LinkDataHandler;
import baguni.common.lib.opengraph.Metadata;
import baguni.common.lib.opengraph.OpenGraph;
import baguni.common.lib.opengraph.OpenGraphException;

@Slf4j
@Service
@RequiredArgsConstructor
public class LinkService {

	private static final int TIMEOUT_SECONDS = 10;

	private final LinkDataHandler linkDataHandler;
	private final LinkMapper linkMapper;

	@Transactional(readOnly = true)
	public LinkInfo getLinkInfo(String url) {
		Link link = linkDataHandler.getLink(url);
		return linkMapper.of(link);
	}

	@Transactional(readOnly = true)
	public LinkResult getLinkResult(Long id, String url, String title) {
		Link link = linkDataHandler.getOptionalLinkById(id).orElseGet(() -> Link.createLinkByUrlAndTitle(url, title));
		return linkMapper.toLinkResult(link);
	}

	@Transactional
	public void updateOgTag(String url) {
		Link link = linkDataHandler.getOptionalLink(url).orElseGet(() -> Link.createLinkByUrl(url));
		try {
			var updatedLink = updateOgTagByJsoup(url, link);
			linkDataHandler.saveLink(updatedLink);
		} catch (Exception e) {
			log.info("url : {} 의 og tag 추출에 실패했습니다.", url, e);
		}
	}

	@Transactional
	public LinkInfo saveLinkAndUpdateOgTagByJsoup(String url) {
		Link link = linkDataHandler.getOptionalLink(url).orElseGet(() -> Link.createLinkByUrl(url));
		try {
			var updatedLink = updateOgTagByJsoup(url, link);
			return linkMapper.toLinkInfo(linkDataHandler.saveLink(updatedLink));
		} catch (Exception e) {
			log.info("OG Tag Jsoup으로 업데이트 : ", e);
			throw ApiLinkException.LINK_OG_TAG_UPDATE_FAILURE();
		}
	}

	/**
	 * title은 update 하지 않음.
	 * 크롤링 시 image_url, description이 비어있을 때 해당 메서드 호출
	 */
	@Transactional
	public LinkInfo saveLinkAndUpdateOgTagBySelenium(String url, String title) {
		Link link = linkDataHandler.getOptionalLink(url).orElseGet(() -> Link.createLinkByUrlAndTitle(url, title));
		try {
			var updatedLink = updateOgTagBySelenium(url, link);
			return linkMapper.toLinkInfo(linkDataHandler.saveLink(updatedLink));
		} catch (Exception e) {
			log.info("OG Tag Selenium으로 업데이트 : ", e);
			throw ApiLinkException.LINK_OG_TAG_UPDATE_FAILURE();
		}
	}

	/**
	 *  Jsoup으로 크롤링
	 */
	private Link updateOgTagByJsoup(String url, Link link) throws OpenGraphException {
		var openGraphOption = new OpenGraphOption(TIMEOUT_SECONDS);
		var openGraphReader = new OpenGraphReaderJsoup(openGraphOption); // Jsoup
		return updateOgTagCommon(url, link, openGraphReader);
	}

	/**
	 * 	Selenium으로 크롤링
	 */
	private Link updateOgTagBySelenium(String url, Link link) throws OpenGraphException {
		var openGraphOption = new OpenGraphOption(TIMEOUT_SECONDS);
		var openGraphReader = new OpenGraphReaderSelenium(openGraphOption); // Selenium
		return updateOgTagCommon(url, link, openGraphReader);
	}

	private Link updateOgTagCommon(String url, Link link, OpenGraphReader openGraphReader) throws OpenGraphException {
		var openGraph = new OpenGraph(url, openGraphReader);
		link.updateMetadata(
			openGraph.getTag(Metadata.OG_TITLE)
					 .orElse(openGraph.getTag(Metadata.TITLE)
									  .orElse("")),
			openGraph.getTag(Metadata.OG_DESCRIPTION)
					 .orElse(openGraph.getTag(Metadata.DESCRIPTION)
									  .orElse("")),
			correctImageUrl(url, openGraph.getTag(Metadata.OG_IMAGE)
										  .orElse(openGraph.getTag(Metadata.IMAGE)
														   .orElse(openGraph.getTag(Metadata.ICON)
																			.orElse(""))))
		);
		return link;
	}

	/**
	 * 	og:image 가 완전한 url 형식이 아닐 수 있어 보정
	 * 	추론 불가능한 image url 일 경우 빈스트링("")으로 대치
	 *
	 *  @author sangwon
	 * 	protocol : https
	 * 	host : blog.dongolab.com
	 */
	private String correctImageUrl(String baseUrl, String imageUrl) {
		// "null"이 넘어오는 경우가 있음.
		// favicon 가져올 때 <link href=> -> "null"로 넘어옴
		if (imageUrl == null || imageUrl.trim().isEmpty() || imageUrl.equals("null")) {
			return "";
		}

		if (imageUrl.startsWith("://")) {
			return "https" + imageUrl;
		}
		if (imageUrl.startsWith("//")) {
			return "https:" + imageUrl;
		}

		try {
			URL url = new URL(baseUrl);
			// ex) https://blog.dongolab.com
			String domain = url.getProtocol() + "://" + url.getHost();

			// ex) /og-image.png -> https://blog.dongholab.com/og-image.png
			if (imageUrl.startsWith("/")) {
				return domain + imageUrl;
			}

			if (!imageUrl.startsWith("http://") && !imageUrl.startsWith("https://")) {
				return domain + "/" + imageUrl;
			}

			return imageUrl;
		} catch (MalformedURLException e) {
			// baseUrl이 올바르지 않은 경우 빈 문자열 반환
			return "";
		}
	}

}
