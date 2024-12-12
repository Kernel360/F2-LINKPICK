package baguni.api.domain.user.service.strategy;

import baguni.core.model.user.User;

public interface ContentInitStrategy {
	void initContent(User user, Long folderId);
}
