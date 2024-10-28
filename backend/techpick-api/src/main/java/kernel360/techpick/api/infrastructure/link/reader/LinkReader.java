package kernel360.techpick.api.infrastructure.link.reader;

import kernel360.techpick.core.model.link.Link;

public interface LinkReader {

	Link read(String url);
}
