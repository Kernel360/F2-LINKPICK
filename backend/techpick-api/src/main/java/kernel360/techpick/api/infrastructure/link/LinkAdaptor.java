package kernel360.techpick.api.infrastructure.link;

import kernel360.techpick.api.domain.link.dto.LinkInfo;
import kernel360.techpick.core.model.link.Link;

public interface LinkAdaptor {

	Link getLink(String url);

	Link saveLink(LinkInfo linkInfo);
}
