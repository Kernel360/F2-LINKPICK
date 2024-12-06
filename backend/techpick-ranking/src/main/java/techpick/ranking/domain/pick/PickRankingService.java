package techpick.ranking.domain.pick;

import static org.springframework.data.mongodb.core.query.Criteria.*;
import static org.springframework.data.mongodb.core.query.Query.*;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Limit;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import techpick.ranking.exeption.ApiRankException;
import techpick.ranking.infra.PickViewCount;
import techpick.ranking.infra.PickViewCountRepository;

@Slf4j
@Service
@RequiredArgsConstructor
public class PickRankingService {

	private final PickViewCountRepository pickViewCountRepository;

	public List<PickViewCount> getLinksOrderByViewCount(LocalDate startDate, LocalDate endDate, int limit) {
		if (startDate == null || endDate == null)
			throw ApiRankException.INVALID_DATE_RANGE();
		if (startDate.isAfter(endDate))
			throw ApiRankException.INVALID_DATE_RANGE();
		if (startDate.isAfter(LocalDate.now()))
			throw ApiRankException.INVALID_DATE_RANGE();

		return pickViewCountRepository.findByDateBetweenOrderByCountDesc(
			startDate.minusDays(1), endDate.plusDays(1),
			Limit.of(limit)
		);
	}
}
