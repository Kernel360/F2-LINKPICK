package baguni.api.service.user.service.strategy;

import baguni.domain.infrastructure.user.dto.UserInfo;

public interface ContentInitStrategy {
	void initContent(UserInfo info, Long folderId);
}
