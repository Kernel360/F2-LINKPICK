package techpick.api.infrastructure.link;

import techpick.api.domain.link.dto.LinkInfo;
import techpick.core.model.link.Link;

public interface LinkAdaptor {

	Link getLink(String url);

	Link saveLink(LinkInfo linkInfo);
}
