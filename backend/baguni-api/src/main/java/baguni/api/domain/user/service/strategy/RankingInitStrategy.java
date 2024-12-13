package baguni.api.domain.user.service.strategy;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import baguni.api.domain.link.dto.LinkInfo;
import baguni.api.domain.link.exception.ApiLinkException;
import baguni.api.domain.link.service.LinkService;
import baguni.api.domain.pick.dto.PickCommand;
import baguni.api.domain.pick.service.PickService;
import baguni.api.infrastructure.ranking.RankingApi;
import baguni.core.dto.UrlWithCount;
import baguni.core.model.user.User;

@Slf4j
@Component
@Qualifier("hot-contents")
@RequiredArgsConstructor
public class RankingInitStrategy implements ContentInitStrategy {

	private static final Integer LOAD_LIMIT = 5;

	private final RankingApi rankingApi;
	private final PickService pickService;
	private final LinkService linkService;

	@Override
	public void initContent(User user, Long folderId) {
		var currentDay = LocalDate.now();
		var before1Day = currentDay.minusDays(1);
		var before30Days = currentDay.minusDays(30);
		var monthlyRanking = rankingApi
			.getUrlRankingByViewCount(before30Days, before1Day, LOAD_LIMIT)
			.getBody();
		savePickFromRankingList(user.getId(), monthlyRanking, folderId);
	}

	/**
	 * 링크 일부가 잘못되었어도, 가능한 링크에 대해서 폴더가 생성되도록 처리.
	 * 리스트를 역순으로 삽입해야 UI 상단에 랭킹이 높은 Pick이 표시된다.
	 *
	 * link 가 db 에 존재하지 않으면 새로 추가함 by psh
	 */
	private void savePickFromRankingList(Long userId, List<UrlWithCount> rankingList, Long destinationFolderId) {
		if (Objects.isNull(rankingList)) {
			return;
		}
		var reverseItr = rankingList.listIterator(rankingList.size());
		while (reverseItr.hasPrevious()) {
			var curr = reverseItr.previous();
			LinkInfo linkInfo = null;
			try {
				linkInfo = linkService.getLinkInfo(curr.url());
			} catch (ApiLinkException exception) {
				linkInfo = linkService.saveLinkAndUpdateOgTag(curr.url());
			}
			if (linkInfo.title().isBlank()) {
				continue;
			}
			var command = new PickCommand.Create(
				userId, linkInfo.title(), new ArrayList<>(), destinationFolderId, linkInfo
			);
			pickService.saveNewPick(command);
		}
	}
}