package techpick.api.domain.user.service.strategy;

import java.util.List;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import techpick.api.domain.folder.dto.FolderCommand;
import techpick.api.infrastructure.folder.FolderDataHandler;
import techpick.core.model.folder.Folder;
import techpick.core.model.user.User;

@Slf4j
@Component
@RequiredArgsConstructor
public class StarterFolderStrategy {

	private static final String FOLDER_NAME = "시작하기";

	private final FolderDataHandler folderDataHandler;

	private final List<ContentInitStrategy> contentStrategies;

	public void initFolder(User user, Folder parentFolder) {
		var command = new FolderCommand.Create(user.getId(), FOLDER_NAME, parentFolder.getId());
		var folder = folderDataHandler.saveFolder(command);
		for (var strategy : contentStrategies) {
			strategy.initContent(user, folder);
		}
	}
}
