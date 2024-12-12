package baguni.api.domain.user.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import baguni.api.domain.user.service.strategy.StarterFolderStrategy;
import baguni.core.annotation.BaguniAnnotation;
import baguni.core.model.folder.Folder;
import baguni.core.model.folder.FolderRepository;
import baguni.core.model.user.User;
import baguni.core.model.user.UserRepository;
import baguni.security.model.OAuth2UserInfo;

@Service
@RequiredArgsConstructor
public class UserService {

	private final UserRepository userRepository;
	private final FolderRepository folderRepository;
	private final StarterFolderStrategy folderStrategy;

	/**
	 * @author minkyeu kim
	 * TODO: 로그인 회원가입 예외 처리
	 *       기본 폴더 생성 실패시 회원 가입 자체가 실패해야 한다. DB가 오염되기 때문.
	 *       그렇다고 회원 가입 로직을 Transaction 으로 감싸면
	 *       현재 로그인 / 회원가입 주체가 백엔드여서 프론트엔드에서
	 *       UI 로직 ("가입 실패하였습니다") 처리를 못한다.
	 *       -
	 *       방법은 있음.
	 *         1. 백엔드에서 Transaction으로 감싸고, 회원 가입 / 로그인이 실패하면 "/login/failed" 로 리다이렉트
	 *         2. 프론트 Next.js 에서 해당 경로는 실패 UI 띄워준다.
	 *       근데 이 방식이 맞는지 잘 모르겠음.
	 *         결국 프론트에서 로그인 / 회원가입의 주체를 가져가는게 맞지 않을까?
	 *         그래야 일관된 로그인 / 회원가입 UI 처리가 가능하다.
	 */
	@BaguniAnnotation.MeasureTime
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
