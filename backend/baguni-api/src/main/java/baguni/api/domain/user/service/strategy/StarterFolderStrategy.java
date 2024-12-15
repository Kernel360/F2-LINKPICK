package baguni.api.domain.user.service.strategy;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import baguni.api.domain.folder.dto.FolderCommand;
import baguni.api.infrastructure.folder.FolderDataHandler;
import baguni.core.model.folder.Folder;
import baguni.core.model.user.User;

@Slf4j
@Component
@RequiredArgsConstructor
public class StarterFolderStrategy {

	private static final String FOLDER_NAME = "시작하기";

	private final FolderDataHandler folderDataHandler;
	private final RankingInitStrategy rankingInitStrategy;
	private final ManualInitStrategy manualInitStrategy;

	/**
	 * @author minkyeu kim
	 * 시작 폴더 생성에 실패해도, 회원 가입은 진행되야 한다.
	 * 따라서 Transaction으로 처리하지 않음.
	 */
	public void initRootFolder(User user) {
		var starterFolder = createStarterFolder(user);
		rankingInitStrategy.initContent(user, starterFolder.getId());
		manualInitStrategy.initContent(user, starterFolder.getId());
	}

	private Folder createStarterFolder(User user) {
		var root = folderDataHandler.getRootFolder(user.getId());
		var command = new FolderCommand.Create(user.getId(), FOLDER_NAME, root.getId());
		return folderDataHandler.saveFolder(command);
	}
}
