package baguni.common.lib.opengraph;

import java.net.URI;
import java.util.Map;

public interface OpenGraphReader {
	Map<String, String> read(URI uri) throws OpenGraphException;
}
