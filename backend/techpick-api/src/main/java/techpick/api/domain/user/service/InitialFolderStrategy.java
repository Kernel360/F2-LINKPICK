package techpick.api.domain.user.service;

import techpick.core.model.folder.Folder;
import techpick.core.model.user.User;

public interface InitialFolderStrategy {
	void initFolder(User user, Folder root);
}
