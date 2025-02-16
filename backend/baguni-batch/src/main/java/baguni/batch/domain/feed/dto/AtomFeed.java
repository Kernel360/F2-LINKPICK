package baguni.batch.domain.feed.dto;

import java.util.List;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;

import lombok.Getter;
import lombok.ToString;

/**
 * @author sangwon
 * Atom vs Rss
 * RSS : 사용자가 웹사이트나 블로그를 개별적으로 방문하지 않고도 웹사이트나 블로그의 업데이트에 액세스할 수 있는 웹 피드 유형입니다.
 * Atom : 콘텐츠 제작자가 자신의 정보를 syndicate 할 수 있는 표준화된 웹 피드 형식
 * https://www.tutorialspoint.com/difference-between-rss-and-atom
 *
 * Atom Feed(xml)에서 파싱한 Raw 데이터를 저장하는 dto
 */
@Getter
@ToString
@JacksonXmlRootElement(localName = "feed")
public class AtomFeed {

	@JacksonXmlElementWrapper(useWrapping = false)
	@JacksonXmlProperty(localName = "entry")
	private List<Article> articles;

	@Getter
	@ToString
	public static class Article {

		@JacksonXmlProperty(localName = "title")
		private String title;

		// <link href=""> -> href 속성 값이 저장
		@JacksonXmlProperty(localName = "link")
		private Link link;

		@JacksonXmlProperty(localName = "updated")
		private String updated;

		@JacksonXmlProperty(localName = "summary")
		private String summary;
	}

	@Getter
	@ToString
	public static class Link {

		// link 태그의 href 속성 이용
		@JacksonXmlProperty(isAttribute = true)
		private String href;
	}
}
