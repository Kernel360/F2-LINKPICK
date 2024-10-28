package kernel360.techpick.api.infrastructure.folder;

import java.util.List;

import kernel360.techpick.core.model.folder.Folder;
import kernel360.techpick.api.domain.folder.dto.FolderCommand;

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
