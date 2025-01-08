package baguni.api.service.pick.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import baguni.entity.model.link.dto.LinkInfo;
import baguni.api.service.pick.dto.PickCommand;
import baguni.api.infrastructure.folder.FolderDataHandler;
import baguni.api.infrastructure.pick.PickBulkDataHandler;
import baguni.api.infrastructure.pick.PickDataHandler;
import baguni.entity.model.folder.Folder;
import baguni.entity.model.pick.Pick;

@Service
@RequiredArgsConstructor
public class PickBulkService {

	private final FolderDataHandler folderDataHandler;
	private final PickDataHandler pickDataHandler;
	private final PickBulkDataHandler pickBulkDataHandler;

	@Transactional
	public void saveBulkPick(Long userId, Long parentFolderId) {
		List<PickCommand.Create> pickList = new ArrayList<>();
		Folder parentFolder = folderDataHandler.getFolder(parentFolderId);

		for (int i = 0; i < 10000; i++) {
			LinkInfo linkInfo = new LinkInfo("test" + i, "링크 제목", "링크 설명", "", null);
			PickCommand.Create command = new PickCommand.Create(userId, "테스트 제목", new ArrayList<>(),
				parentFolderId, linkInfo);
			pickList.add(command);
		}
		pickBulkDataHandler.bulkInsertPick(pickList);

		for (PickCommand.Create command : pickList) {
			Pick pick = pickDataHandler.getPickUrl(userId, command.linkInfo().url());
			parentFolder.addChildPickIdOrdered(pick.getId());
		}
	}
}