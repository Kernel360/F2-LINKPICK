package techpick.api.domain.pick.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import techpick.api.domain.link.dto.LinkInfo;
import techpick.api.domain.pick.dto.PickCommand;
import techpick.api.infrastructure.pick.PickBulkDataHandler;

@Service
@RequiredArgsConstructor
public class PickBulkService {

	private final PickBulkDataHandler pickBulkDataHandler;

	@Transactional
	public void saveBulkPick(Long userId, Long parentFolderId) {
		List<PickCommand.Create> pickList = new ArrayList<>();
		for (int i = 0; i < 10000; i++) {
			LinkInfo linkInfo = new LinkInfo(String.valueOf(i), "링크 제목", "링크 설명", "링크 이미지 url", null);
			PickCommand.Create command = new PickCommand.Create(userId, "테스트 제목", new ArrayList<>(),
				parentFolderId, linkInfo);
			pickList.add(command);
		}
		pickBulkDataHandler.bulkInsertPick(pickList);
	}
}
