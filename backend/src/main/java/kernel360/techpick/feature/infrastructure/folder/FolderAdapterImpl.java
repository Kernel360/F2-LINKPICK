package kernel360.techpick.feature.infrastructure.folder;

import java.util.List;

import org.apache.commons.lang3.ObjectUtils;
import org.springframework.stereotype.Component;

import kernel360.techpick.core.model.folder.Folder;
import kernel360.techpick.core.model.folder.FolderRepository;
import kernel360.techpick.core.model.user.User;
import kernel360.techpick.feature.domain.folder.exception.ApiFolderException;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class FolderAdapterImpl implements FolderAdapter {

	FolderRepository folderRepository;

	@Override
	public Folder readFolder(User user, Long folderId) {
		Folder folder = folderRepository.findById(folderId).orElseThrow(ApiFolderException::FOLDER_NOT_FOUND);
		if (ObjectUtils.notEqual(folder.getUser(), user)) {
			throw ApiFolderException.FOLDER_ACCESS_DENIED();
		}
		return folder;
	}

	@Override
	public List<Folder> readFolderList(User user, Folder parentFolder) {
		if (ObjectUtils.notEqual(parentFolder.getUser(), user)) {
			throw ApiFolderException.FOLDER_ACCESS_DENIED();
		}
		return folderRepository.findByParentFolder(parentFolder);
	}

	@Override
	public Folder writeFolder(Folder folder) throws ApiFolderException {
		return folderRepository.save(folder);
	}

	@Override
	public void removeFolder(Folder folder) {
		folderRepository.delete(folder);
	}
}
