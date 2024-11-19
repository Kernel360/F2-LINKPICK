package techpick.api.domain.folder.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import techpick.api.domain.folder.dto.FolderCommand;
import techpick.api.domain.folder.exception.ApiFolderException;
import techpick.api.infrastructure.folder.FolderDataHandler;
import techpick.api.infrastructure.pick.PickDataHandler;
import techpick.core.model.folder.Folder;
import techpick.core.model.pick.Pick;

/**
 * 폴더 Import와 Export를 담당하는 서비스
 * 크롬브라우저에 import 가능한 형식으로 저장한 폴더들과 픽들을 export
 * 크롬브라우저에서 export한 html을 Techpick에 import
 * */
@Service
@RequiredArgsConstructor
public class FolderMigrationService {

	private final FolderDataHandler folderDataHandler;
	private final PickDataHandler pickDataHandler;

	@Transactional(readOnly = true)
	public String exportFolder(FolderCommand.Export command) {
		StringBuilder sb = new StringBuilder();
		Folder folder = folderDataHandler.getFolder(command.folderId());
		validateFolderAccess(command.userId(), folder);

		return DFS(new StringBuilder(), folder).toString();
	}

	@Transactional(readOnly = true)
	public String exportUserFolder(Long userId) {
		StringBuilder sb = new StringBuilder();
		DFS(sb, folderDataHandler.getUnclassifiedFolder(userId));
		DFS(sb, folderDataHandler.getRootFolder(userId));
		DFS(sb, folderDataHandler.getRecycleBin(userId));
		return sb.toString();
	}

	private StringBuilder DFS(StringBuilder sb, Folder folder) {
		sb.append("<DT>").append("<H3>").append(folder.getName()).append("</H3>\n");
		sb.append("<DL>\n");
		List<Folder> childFolderList = folderDataHandler.getFolderListPreservingOrder(
			folder.getChildFolderIdOrderedList());
		// 자식폴더를 순회하며 추가
		for (Folder childFolder : childFolderList) {
			DFS(sb, childFolder);
		}
		// 자식픽들을 순회하며 추가
		List<Pick> childPickList = pickDataHandler.getPickListPreservingOrder(folder.getChildPickIdOrderedList());
		for (Pick pick : childPickList) {
			sb.append("<DT>")
				.append("<A HREF=\"")
				.append(pick.getLink().getUrl())
				.append("\">")
				.append(pick.getTitle())
				.append("</A>\n");
		}
		sb.append("</DL>\n");
		return sb;
	}

	private void validateFolderAccess(Long userId, Folder folder) {
		if (!folder.getUser().getId().equals(userId)) {
			throw ApiFolderException.FOLDER_ACCESS_DENIED();
		}
	}
}
