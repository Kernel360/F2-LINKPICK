package techpick.api.infrastructure.pick;

import static techpick.core.model.pick.QPick.*;
import static techpick.core.model.pick.QPickTag.*;

import java.util.List;
import java.util.StringTokenizer;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

import com.querydsl.core.types.ConstructorExpression;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import techpick.api.domain.link.dto.LinkInfo;
import techpick.api.domain.pick.dto.PickResult;

@Slf4j
@Repository
@RequiredArgsConstructor
public class PickQuery {

	private final JPAQueryFactory jpaQueryFactory;

	// TODO: 폴더 리스트 내 픽 조회 시 java sort vs querydsl 시간 측정 후 빠르면 사용 예정
	public List<PickResult.Pick> getPickList(Long userId, List<Long> pickIdList) {
		String orderListStr = pickIdList.stream()
			.map(String::valueOf)
			.collect(Collectors.joining(", "));

		Expression<Integer> orderByField = Expressions.template(Integer.class,
			"FIELD({0}, " + orderListStr + ")", pick.id);

		OrderSpecifier<Integer> orderSpecifier = new OrderSpecifier<>(Order.ASC, orderByField);

		return jpaQueryFactory
			.select(pickResultFields())
			.from(pick)
			.where(
				userEqCondition(userId),
				pickIdListCondition(pickIdList)
			)
			.orderBy(orderSpecifier)
			.fetch();
	}

	// TODO: 본인 픽이 아닌 다른 사람의 픽도 검색하고 싶다면 userId 부분 제거
	public Slice<PickResult.Pick> searchPick(Long userId, List<Long> folderIdList, List<String> searchTokenList,
		List<Long> tagIdList, Long cursor, int size) {

		List<PickResult.Pick> pickList = jpaQueryFactory
			.select(pickResultFields()) // dto로 반환
			.from(pick)
			.leftJoin(pickTag).on(pick.id.eq(pickTag.pick.id))
			.where(
				userEqCondition(userId), // 본인 pick 조회
				folderIdCondition(folderIdList), // 폴더에 해당 하는 pick 조회
				searchTokenListCondition(searchTokenList), // 제목 검색 조건
				tagIdListCondition(tagIdList), // 태그 검색 조건
				cursorIdCondition(cursor) // 페이지네이션 조건
			)
			.distinct()
			.limit(size + 1)
			.fetch();

		/**
		 * 다음 페이지 존재 여부 확인 (true: 있음, false: 없음)
		 * 다음 페이지가 있는지 확인하기 위해 limit에 size + 1
		 * 다음 페이지가 존재한다면, 초과된 데이터 1개 제거
		 */
		boolean hasNext = false;
		if (pickList.size() > size) {
			pickList.remove(size);
			hasNext = true;
		}

		return new SliceImpl<>(pickList, PageRequest.ofSize(size), hasNext);
	}

	private ConstructorExpression<PickResult.Pick> pickResultFields() {
		return Projections.constructor(
			PickResult.Pick.class,
			pick.id,
			pick.title,
			Projections.constructor(
				LinkInfo.class,
				pick.link.url,
				pick.link.title,
				pick.link.description,
				pick.link.imageUrl,
				pick.link.invalidatedAt),
			pick.parentFolder.id,
			pick.tagIdOrderedList,
			pick.createdAt,
			pick.updatedAt
		);
	}

	private BooleanExpression userEqCondition(Long userId) {
		return pick.user.id.eq(userId);
	}

	private BooleanExpression cursorIdCondition(Long cursorId) {
		return cursorId == null ? null : pick.id.gt(cursorId);
	}

	private BooleanExpression pickIdListCondition(List<Long> pickIdList) {
		if (pickIdList == null || pickIdList.isEmpty()) {
			return null;
		}
		return pick.id.in(pickIdList);
	}

	private BooleanExpression folderIdCondition(List<Long> folderIdList) {
		if (folderIdList == null || folderIdList.isEmpty()) {
			return null;
		}
		return pick.parentFolder.id.in(folderIdList);
	}

	private BooleanExpression searchTokenListCondition(List<String> searchTokenList) {
		if (searchTokenList == null || searchTokenList.isEmpty()) {
			return null;
		}

		return searchTokenList.stream()
			.map(token -> {
				StringTokenizer stringTokenizer = new StringTokenizer(token);
				BooleanExpression combinedCondition = null;
				while (stringTokenizer.hasMoreTokens()) {
					String part = stringTokenizer.nextToken().toLowerCase();
					// lower() 메서드를 사용하여 pick.title을 소문자로 변환
					BooleanExpression condition = pick.title.lower().like("%" + part + "%");
					combinedCondition = (combinedCondition == null) ? condition : combinedCondition.and(condition);
				}
				return combinedCondition;
			})
			.reduce(BooleanExpression::and)
			.orElse(null);
	}

	private BooleanExpression tagIdListCondition(List<Long> tagIdList) {
		if (tagIdList == null || tagIdList.isEmpty()) {
			return null;
		}

		return jpaQueryFactory
			.selectFrom(pickTag)
			.where(
				pickTag.pick.id.eq(pick.id)
					.and(pickTag.tag.id.in(tagIdList)))
			.groupBy(pickTag.pick.id)
			.having(pickTag.tag.id.count().eq((long)tagIdList.size()))
			.exists();
	}
}
