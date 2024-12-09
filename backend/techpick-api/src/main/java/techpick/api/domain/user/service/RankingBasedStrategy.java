package techpick.api.domain.user.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import techpick.api.domain.link.dto.LinkMapper;
import techpick.api.domain.link.exception.ApiLinkException;
import techpick.api.domain.link.service.LinkService;
import techpick.api.domain.pick.dto.PickCommand;
import techpick.api.domain.pick.service.PickService;
import techpick.api.infrastructure.ranking.RankingRepository;
import techpick.core.dto.UrlWithCount;
import techpick.core.model.folder.Folder;
import techpick.core.model.folder.FolderRepository;
import techpick.core.model.user.User;

@Slf4j
@Component
@RequiredArgsConstructor
@Qualifier(RankingBasedStrategy.QUALIFIER)
public class RankingBasedStrategy implements InitialFolderStrategy {

	public static final String QUALIFIER = "ranking";

	private static final String MONTHLY_FOLDER_NAME = "monthly";
	private static final Integer LOAD_LIMIT = 15;

	private final FolderRepository folderRepository;
	private final RankingRepository rankingRepository;
	private final PickService pickService;
	private final LinkService linkService;

	@Override
	public void initFolder(User user, Folder root) {
		var monthlyFolder = folderRepository.save(Folder.createEmptyGeneralFolder(user, root, MONTHLY_FOLDER_NAME));
		var currentDay = LocalDate.now();
		var before1Day = currentDay.minusDays(1);
		var before30Days = currentDay.minusDays(30);
		var monthlyRanking = rankingRepository
			.getLinkRankingByViewCount(before30Days, before1Day, LOAD_LIMIT)
			.getBody();
		savePickFromRankingList(user.getId(), monthlyRanking, monthlyFolder.getId());
	}

	/**
	 * 링크 일부가 잘못되었어도, 가능한 링크에 대해서 폴더가 생성되도록 처리
	 */
	private void savePickFromRankingList(Long userId, List<UrlWithCount> rankingList, Long destinationFolderId) {
		if (Objects.isNull(rankingList)) {
			return;
		}
		for (UrlWithCount rank : rankingList) {
			try {
				var linkInfo = linkService.getLinkInfo(rank.url());
				var command = new PickCommand.Create(
					userId, linkInfo.title(), new ArrayList<>(), destinationFolderId, linkInfo
				);
				pickService.saveNewPick(command);
			} catch (ApiLinkException exception) {
				log.error("[회원 가입 - 초기 북마크 설정] 서버에 저장되지 않은 링크 입니다! ={}", rank.url(), exception);
			}
		}
	}
}
