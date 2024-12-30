package baguni.domain.service.user.service.strategy;

import baguni.domain.model.user.User;

public interface ContentInitStrategy {
	void initContent(User user, Long folderId);
}
