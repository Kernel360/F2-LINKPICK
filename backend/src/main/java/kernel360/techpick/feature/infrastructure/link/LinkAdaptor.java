package kernel360.techpick.feature.infrastructure.link;

import kernel360.techpick.core.model.link.Link;
import kernel360.techpick.feature.domain.link.dto.LinkInfo;

public interface LinkAdaptor {

    Link getLink(String url);

    Link saveLink(LinkInfo linkInfo);
}
