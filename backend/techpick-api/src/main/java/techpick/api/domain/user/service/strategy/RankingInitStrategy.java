package techpick.api.domain.user.service.strategy;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import techpick.api.domain.link.exception.ApiLinkException;
import techpick.api.domain.link.service.LinkService;
import techpick.api.domain.pick.dto.PickCommand;
import techpick.api.domain.pick.service.PickService;
import techpick.api.infrastructure.ranking.RankingApi;
import techpick.core.dto.UrlWithCount;
import techpick.core.model.folder.Folder;
import techpick.core.model.user.User;

@Slf4j
@Component
@Qualifier("hot-contents")
@RequiredArgsConstructor
public class RankingInitStrategy implements ContentInitStrategy {

	private static final Integer LOAD_LIMIT = 15;

	private final RankingApi rankingApi;
	private final PickService pickService;
	private final LinkService linkService;

	@Override
	public void initContent(User user, Folder parentFolder) {
		var currentDay = LocalDate.now();
		var before1Day = currentDay.minusDays(1);
		var before30Days = currentDay.minusDays(30);
		var monthlyRanking = rankingApi
			.getUrlRankingByViewCount(before30Days, before1Day, LOAD_LIMIT)
			.getBody();
		savePickFromRankingList(user.getId(), monthlyRanking, parentFolder.getId());
	}

	/**
	 * 링크 일부가 잘못되었어도, 가능한 링크에 대해서 폴더가 생성되도록 처리.
	 * 리스트를 역순으로 삽입해야 UI 상단에 랭킹이 높은 Pick이 표시된다.
	 */
	private void savePickFromRankingList(Long userId, List<UrlWithCount> rankingList, Long destinationFolderId) {
		if (Objects.isNull(rankingList)) {
			return;
		}
		var reverseItr = rankingList.listIterator(rankingList.size());
		while (reverseItr.hasPrevious()) {
			var curr = reverseItr.previous();
			try {
				var linkInfo = linkService.getLinkInfo(curr.url());
				var command = new PickCommand.Create(
					userId, linkInfo.title(), new ArrayList<>(), destinationFolderId, linkInfo
				);
				pickService.saveNewPick(command);
			} catch (ApiLinkException exception) {
				log.error("[회원 가입 - 초기 북마크 설정] 서버에 저장되지 않은 링크 입니다! ={}", curr.url(), exception);
			}
		}
	}
}
