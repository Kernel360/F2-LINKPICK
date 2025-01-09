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

	private final Map<String, String> openGraphTags;

	public OpenGraph(String uri, OpenGraphReader openGraphReader) throws OpenGraphException {
		try {
			var parsedUri = new URI(uri);
			this.openGraphTags = openGraphReader.read(parsedUri);
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
