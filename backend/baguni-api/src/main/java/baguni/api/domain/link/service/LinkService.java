package baguni.api.domain.link.service;

import java.net.MalformedURLException;
import java.net.URL;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import baguni.api.domain.link.dto.LinkInfo;
import baguni.api.domain.link.dto.LinkMapper;
import baguni.api.domain.link.exception.ApiLinkException;
import baguni.api.infrastructure.link.LinkDataHandler;
import baguni.core.lib.opengraph.Metadata;
import baguni.core.lib.opengraph.OpenGraph;
import baguni.core.lib.opengraph.OpenGraphException;
import baguni.core.model.link.Link;

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
	public void updateOgTag(String url) {
		Link link = linkDataHandler.getOptionalLink(url).orElseGet(() -> Link.createLinkByUrl(url));
		try {
			var updatedLink = updateOpengraph(url, link);
			linkDataHandler.saveLink(updatedLink);
		} catch (Exception e) {
			log.info("url : {} 의 og tag 추출에 실패했습니다.", url, e);
		}
	}

	@Transactional
	public LinkInfo saveLinkAndUpdateOgTag(String url) {
		Link link = linkDataHandler.getOptionalLink(url).orElseGet(() -> Link.createLinkByUrl(url));
		try {
			var updatedLink = updateOpengraph(url, link);
			return linkMapper.toLinkInfo(linkDataHandler.saveLink(updatedLink));
		} catch (Exception e) {
			log.info("saveLinkAndUpdateOgTag : ", e);
			throw ApiLinkException.LINK_OG_TAG_UPDATE_FAILURE();
		}
	}

	private Link updateOpengraph(String url, Link link) throws OpenGraphException {
		var openGraph = new OpenGraph(url);
		link.updateMetadata(
			openGraph.getTag(Metadata.TITLE).orElse(""),
			openGraph.getTag(Metadata.DESCRIPTION).orElse(""),
			correctImageUrl(url, openGraph.getTag(Metadata.IMAGE).orElse(""))
		);
		return link;
	}

	/**
	 * og:image 가 완전한 url 형식이 아닐 수 있어 보정
	 * 추론 불가능한 image url 일 경우 빈스트링("")으로 대치
	 *
	 * @author sangwon
	 * */

	/**
	 * 	protocol : https
	 * 	host : blog.dongolab.com
	 */
	private String correctImageUrl(String baseUrl, String imageUrl) {
		if (imageUrl == null || imageUrl.trim().isEmpty()) {
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
