package techpick.api.domain.user.service.strategy;

import java.util.List;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import techpick.api.domain.folder.dto.FolderCommand;
import techpick.api.domain.folder.service.FolderService;
import techpick.api.domain.link.service.LinkService;
import techpick.api.domain.pick.service.PickService;
import techpick.api.infrastructure.folder.FolderDataHandler;
import techpick.core.model.folder.Folder;
import techpick.core.model.user.User;

@Slf4j
@Component
@RequiredArgsConstructor
public class StarterFolderStrategy {

	private static final String FOLDER_NAME = "시작하기";

	private final FolderDataHandler folderService;
	private final RankingInitStrategy rankingInitStrategy;
	private final ManualInitStrategy manualInitStrategy;

	public void initFolder(User user, Folder parentFolder) {
		var command = new FolderCommand.Create(user.getId(), FOLDER_NAME, parentFolder.getId());
		var createdFolder = folderService.saveFolder(command);
		rankingInitStrategy.initContent(user, createdFolder.getId());
		manualInitStrategy.initContent(user, createdFolder.getId());
	}
}
