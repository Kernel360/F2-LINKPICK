package kernel360.techpick.api.infrastructure.link.writer;

import kernel360.techpick.core.model.link.Link;
import kernel360.techpick.api.domain.link.dto.LinkInfo;

public interface LinkWriter {

	Link writeLink(LinkInfo linkInfo);
}
