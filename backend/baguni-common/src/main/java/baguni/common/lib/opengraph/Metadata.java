package baguni.common.lib.opengraph;

/**
 * @author minkyeu kim
 * OpenGraph 표준에 따른 데이터 형식
 * 참고 - https://ogp.me/
 */
public class Metadata {

	/***************************************
	 *      Basic Metadata (required)
	 ***************************************/

	// The title of your object as it should appear within the graph, e.g., "The Rock".
	public static final MetadataTag TITLE = MetadataTag.of("title");

	public static final MetadataTag OG_TITLE = MetadataTag.of("og:title");

	//  The type of your object, e.g., "video.movie".
	//  Depending on the type you specify, other properties may also be required.
	public static final MetadataTag TYPE = MetadataTag.of("og:type");

	// An image URL which should represent your object within the graph.
	public static final MetadataTag IMAGE = MetadataTag.of("image");

	public static final MetadataTag OG_IMAGE = MetadataTag.of("og:image");

	// The canonical URL of your object that will be used as its permanent ID in the graph, e.g., "https://www.imdb.com/title/tt0117500/".
	public static final MetadataTag URL = MetadataTag.of("og:url");

	/***************************************
	 *         Optional Metadata
	 ***************************************/

	//  A URL to an audio file to accompany this object.
	public static final MetadataTag AUDIO = MetadataTag.of("og:audio");

	// A one to two sentence description of your object.
	public static final MetadataTag DESCRIPTION = MetadataTag.of("description");

	public static final MetadataTag OG_DESCRIPTION = MetadataTag.of("og:description");

	//  The word that appears before this object's title in a sentence. An enum of (a, an, the, "", auto). If auto is
	//  chosen, the consumer of your data should chose between "a" or "an". Default is "" (blank).
	public static final MetadataTag DETERMINER = MetadataTag.of("og:determiner");

	// The locale these tags are marked up in. Of the format language_TERRITORY. Default is en_US.
	public static final MetadataTag LOCALE = MetadataTag.of("og:locale");

	// An array of other locales this page is available in.
	public static final MetadataTag LOCALE_ALTERNATE = MetadataTag.of("og:locale:alternate");

	//  If your object is part of a larger web site, the name which should be
	//  displayed for the overall site. e.g.,"IMDb".
	public static final MetadataTag SITE_NAME = MetadataTag.of("og:site_name");

	// A URL to a video file that complements this object.
	public static final MetadataTag VIDEO = MetadataTag.of("og:video");

	/**
	 * VO for metadata key
	 */
	public record MetadataTag(String key) {
		public static MetadataTag of(String key) {
			return new MetadataTag(key);
		}
	}
}
