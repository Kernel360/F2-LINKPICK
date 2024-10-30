package techpick.batch.domain.rss.dto;

import java.util.List;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;

import lombok.Getter;

/**
 * Rss Feed(xml)에서 파싱한 Raw 데이터를 저장하는 dto
 */
@Getter
public class RssRawFeed {

	@JacksonXmlProperty(localName = "channel")
	private Channel channel;

	@Getter
	public static class Channel {

		@JacksonXmlElementWrapper(useWrapping = false)
		@JacksonXmlProperty(localName = "item")
		private List<Item> item;
	}

	@Getter
	public static class Item {

		@JacksonXmlProperty(localName = "title")
		private String title;

		@JacksonXmlProperty(localName = "link")
		private String link;

		@JacksonXmlProperty(localName = "guid")
		private String guid;

		@JacksonXmlProperty(localName = "pubDate")
		private String pubDate;

		@JacksonXmlProperty(localName = "description")
		private String description;

		@JacksonXmlProperty(localName = "creator")
		private String creator;

		@JacksonXmlElementWrapper(useWrapping = false)
		@JacksonXmlProperty(localName = "category")
		private List<String> category;
	}
}