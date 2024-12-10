package techpick.api.domain.user.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import techpick.api.domain.user.service.strategy.StarterFolderStrategy;
import techpick.core.model.folder.Folder;
import techpick.core.model.folder.FolderRepository;
import techpick.core.model.user.User;
import techpick.core.model.user.UserRepository;
import techpick.security.model.OAuth2UserInfo;

@Service
@RequiredArgsConstructor
public class UserService {

	private final UserRepository userRepository;
	private final FolderRepository folderRepository;
	private final StarterFolderStrategy folderStrategy;

	public void createUser(OAuth2UserInfo userInfo) {
		if (!userRepository.existsBySocialProviderId(userInfo.getName())) {
			User user = User.createSocialUser(
				userInfo.getProvider(),
				userInfo.getName(),
				userInfo.getEmail()
			);
			createBasicFolder(userRepository.save(user));
		}
	}

	private void createBasicFolder(User user) {
		folderRepository.save(Folder.createEmptyUnclassifiedFolder(user));
		folderRepository.save(Folder.createEmptyRecycleBinFolder(user));
		var root = folderRepository.save(Folder.createEmptyRootFolder(user));
		folderStrategy.initFolder(user, root);
	}
}
