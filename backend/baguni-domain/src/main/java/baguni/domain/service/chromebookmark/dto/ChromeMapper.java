package baguni.domain.service.chromebookmark.dto;

import java.util.ArrayList;

import org.springframework.stereotype.Component;

import baguni.domain.service.folder.dto.FolderCommand;
import baguni.domain.service.link.dto.LinkInfo;
import baguni.domain.service.pick.dto.PickCommand;

@Component
public class ChromeMapper {

	public FolderCommand.Create toFolderCreateCommand(Long userId, Long parentFolderId, ChromeFolder folder) {
		return new FolderCommand.Create(userId, folder.getName(), parentFolderId);
	}

	public PickCommand.Create toPickCreateCommand(Long userId, Long parentFolderId, ChromeBookmark bookmark) {
		return new PickCommand.Create(
			userId,
			bookmark.getTitle(),
			new ArrayList<>(),
			parentFolderId,
			new LinkInfo(bookmark.getUrl(), "", "", "", null)
		);
	}
}
