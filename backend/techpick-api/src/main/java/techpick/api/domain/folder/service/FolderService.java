package techpick.api.domain.folder.service;

import java.util.List;

import techpick.api.domain.folder.dto.FolderCommand;
import techpick.api.domain.folder.dto.FolderResult;

public interface FolderService {

	FolderResult getFolder(FolderCommand.Read command);

	List<FolderResult> getChildFolderList(FolderCommand.Read command);

	FolderResult getRootFolder(Long userId);

	FolderResult getRecycleBin(Long userId);

	FolderResult getUnclassifiedFolder(Long userId);

	FolderResult saveFolder(FolderCommand.Create command);

	FolderResult updateFolder(FolderCommand.Update command);

	void moveFolder(FolderCommand.Move command);

	void deleteFolder(FolderCommand.Delete command);
}
