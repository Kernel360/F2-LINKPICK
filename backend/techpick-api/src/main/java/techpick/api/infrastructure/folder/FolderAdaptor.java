package techpick.api.infrastructure.folder;

import java.util.List;

import techpick.api.domain.folder.dto.FolderCommand;
import techpick.core.model.folder.Folder;

public interface FolderAdaptor {

	Folder getFolder(Long folderId);

	// idList에 포함된 모든 ID에 해당하는 폴더 리스트 조회, 순서를 보장하지 않음
	List<Folder> getFolderList(List<Long> idList);

	// idList에 포함된 모든 ID에 해당하는 폴더 리스트 조회, 순서는 idList의 순서를 따름
	List<Folder> getFolderListPreservingOrder(List<Long> idList);

	Folder getRootFolder(Long userId);

	Folder getRecycleBin(Long userId);

	Folder getUnclassifiedFolder(Long userId);

	Folder saveFolder(FolderCommand.Create command);

	Folder updateFolder(FolderCommand.Update command);

	List<Long> moveFolderWithinParent(FolderCommand.Move command);

	List<Long> moveFolderToDifferentParent(FolderCommand.Move command);

	void deleteFolderList(FolderCommand.Delete command);
}
