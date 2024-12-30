package baguni.api.service.user.service.strategy;

import baguni.api.service.user.dto.UserInfo;

public interface ContentInitStrategy {
	void initContent(UserInfo info, Long folderId);
}
