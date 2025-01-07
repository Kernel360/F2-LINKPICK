package baguni.common.lib.opengraph;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Map;
import java.util.Optional;

/**
 * @author minkyeu kim
 * OpenGraph Metadata Utility Class
 */
public class OpenGraph {

	/**
	 * timeout setting for connection
	 */
	private static final int TIMEOUT_SECONDS = 2;

	private final Map<String, String> openGraphTags;

	public OpenGraph(String uri) throws OpenGraphException {
		try {
			var URI = new URI(uri);
			var openGraphOption = new OpenGraphOption(TIMEOUT_SECONDS);
			OpenGraphReader openGraphReader = new OpenGraphReader(openGraphOption);
			this.openGraphTags = openGraphReader.read(URI);
		} catch (URISyntaxException e) {
			throw new OpenGraphException("Invalid URI: " + uri, e);
		}
	}

	public Optional<String> getTag(Metadata.MetadataTag metadataTag) {
		var key = metadataTag.key();
		if (openGraphTags.containsKey(key)) {
			return Optional.of(openGraphTags.get(key));
		}
		return Optional.empty();
	}
}
