package techpick.api.domain.pick.service;

import static org.assertj.core.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Slice;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.slf4j.Slf4j;
import techpick.TechPickApiApplication;
import techpick.api.domain.folder.exception.ApiFolderException;
import techpick.api.domain.link.dto.LinkInfo;
import techpick.api.domain.pick.dto.PickCommand;
import techpick.api.domain.pick.dto.PickResult;
import techpick.api.domain.tag.exception.ApiTagException;
import techpick.core.model.folder.Folder;
import techpick.core.model.folder.FolderRepository;
import techpick.core.model.tag.Tag;
import techpick.core.model.tag.TagRepository;
import techpick.core.model.user.Role;
import techpick.core.model.user.SocialType;
import techpick.core.model.user.User;
import techpick.core.model.user.UserRepository;

@Slf4j
@SpringBootTest(classes = TechPickApiApplication.class)
@ActiveProfiles("local")
@Transactional
class PickSearchTest {

	@Autowired
	PickSearchService pickSearchService;

	@Autowired
	PickService pickService;

	User user1, user2;
	Folder root1, recycleBin1, unclassified1, general1;
	Folder root2, recycleBin2, unclassified2, general2;
	Tag tag1, tag2, tag3, tag4, tag5, tag6;

	@BeforeEach
	void setUp(
		@Autowired UserRepository userRepository,
		@Autowired FolderRepository folderRepository,
		@Autowired TagRepository tagRepository
	) {
		saveTestUser(userRepository);
		saveTestFolder(folderRepository);
		saveTestTag(tagRepository);
		saveUser1TestPick();
		saveUser2TestPick();
	}

	@Nested
	@DisplayName("검색 여러 조건 테스트")
	class SearchConditionTest {

		@Test
		@DisplayName("모든 조건 검색")
		void searchTest1() {
			// given
			List<Long> folderIdList = List.of(unclassified1.getId(), recycleBin1.getId());
			List<String> searchTokenList = List.of("리액트", "서버", "스프링");
			List<Long> tagIdList = List.of(tag1.getId(), tag2.getId());

			PickCommand.Search search = new PickCommand.Search(user1.getId(), folderIdList, searchTokenList, tagIdList,
				0L, 30);

			// when
			Slice<PickResult.Pick> pickList = pickSearchService.searchPick(search);

			// then
			assertThat(pickList).isNotNull();
			assertThat(pickList.getNumberOfElements()).isEqualTo(10); // 검색 결과 수

			for (PickResult.Pick pick : pickList) {
				assertThat(searchTokenList.stream().allMatch(pick.title()::contains)).isTrue(); // 검색어 포함 여부
				assertThat(pick.tagIdOrderedList()).contains(tag1.getId(), tag2.getId()); // 태그 조건 확인
				assertThat(folderIdList).contains(pick.parentFolderId()); // 폴더 ID 조건 확인
			}
		}

		@Test
		@DisplayName("폴더 null")
		void searchTest2() {
			// given
			List<Long> folderIdList = null;
			List<String> searchTokenList = List.of("리액트", "서버", "스프링");
			List<Long> tagIdList = List.of(tag1.getId(), tag2.getId());

			PickCommand.Search search = new PickCommand.Search(user1.getId(), folderIdList, searchTokenList, tagIdList,
				0L, 30);

			// when
			Slice<PickResult.Pick> pickList = pickSearchService.searchPick(search);

			// then
			assertThat(pickList).isNotNull();
			assertThat(pickList.getNumberOfElements()).isEqualTo(10); // 검색 결과 수

			for (PickResult.Pick pick : pickList) {
				assertThat(searchTokenList.stream().allMatch(pick.title()::contains)).isTrue();
				assertThat(pick.tagIdOrderedList()).containsAll(tagIdList);
				assertThat(List.of(unclassified1.getId(), recycleBin1.getId(), root1.getId(), general1.getId()))
					.contains(pick.parentFolderId());
			}
		}

		@Test
		@DisplayName("제목 검색 null")
		void searchTest3() {
			// given
			List<Long> folderIdList = List.of(unclassified1.getId(), recycleBin1.getId());
			List<String> searchTokenList = null;
			List<Long> tagIdList = List.of(tag1.getId(), tag2.getId());

			PickCommand.Search search = new PickCommand.Search(user1.getId(), folderIdList, searchTokenList, tagIdList,
				0L, 30);

			// when
			Slice<PickResult.Pick> pickList = pickSearchService.searchPick(search);

			// then
			assertThat(pickList).isNotNull();
			assertThat(pickList.getNumberOfElements()).isEqualTo(20); // 검색 결과 수

			for (PickResult.Pick pick : pickList) {
				assertThat(pick.tagIdOrderedList()).containsAll(tagIdList);
				assertThat(folderIdList).contains(pick.parentFolderId());
			}
		}

		@Test
		@DisplayName("태그 null")
		void searchTest4() {
			// given
			List<Long> folderIdList = List.of(unclassified1.getId(), recycleBin1.getId());
			List<String> searchTokenList = List.of("리액트", "서버", "스프링");
			List<Long> tagIdList = null;

			PickCommand.Search search = new PickCommand.Search(user1.getId(), folderIdList, searchTokenList, tagIdList,
				0L, 30);

			// when
			Slice<PickResult.Pick> pickList = pickSearchService.searchPick(search);

			// then
			assertThat(pickList).isNotNull();
			assertThat(pickList.getNumberOfElements()).isEqualTo(10); // 검색 결과 수

			for (PickResult.Pick pick : pickList) {
				assertThat(searchTokenList.stream().allMatch(pick.title()::contains)).isTrue();
				assertThat(folderIdList).contains(pick.parentFolderId());
			}
		}

		@Test
		@DisplayName("폴더, 검색 null")
		void searchTest5() {
			// given
			List<Long> folderIdList = null;
			List<String> searchTokenList = null;
			List<Long> tagIdList = List.of(tag1.getId(), tag2.getId());

			PickCommand.Search search = new PickCommand.Search(user1.getId(), folderIdList, searchTokenList, tagIdList,
				0L, 30);

			// when
			Slice<PickResult.Pick> pickList = pickSearchService.searchPick(search);

			// then
			assertThat(pickList).isNotNull();
			assertThat(pickList.getNumberOfElements()).isEqualTo(20); // 검색 결과 수

			for (PickResult.Pick pick : pickList) {
				assertThat(pick.tagIdOrderedList()).containsAll(tagIdList);
			}
		}

		@Test
		@DisplayName("전체 null : 전체 검색")
		void searchTest6() {
			// given
			List<Long> folderIdList = null;
			List<String> searchTokenList = null;
			List<Long> tagIdList = null;

			PickCommand.Search search = new PickCommand.Search(user1.getId(), folderIdList, searchTokenList, tagIdList,
				0L, 30);

			// when
			Slice<PickResult.Pick> pickList = pickSearchService.searchPick(search);

			// then
			assertThat(pickList).isNotNull();
			assertThat(pickList.getNumberOfElements()).isEqualTo(30); // 검색 결과 수
		}

		@Test
		@DisplayName("폴더 : 일반, 제목 : s")
		void searchTest7() {
			// given
			List<Long> folderIdList = List.of(general1.getId());
			List<String> searchTokenList = List.of("s");
			List<Long> tagIdList = null;

			PickCommand.Search search = new PickCommand.Search(user1.getId(), folderIdList, searchTokenList, tagIdList,
				0L, 30);

			// when
			Slice<PickResult.Pick> pickList = pickSearchService.searchPick(search);

			// then
			assertThat(pickList).isNotNull();
			assertThat(pickList.getNumberOfElements()).isEqualTo(10); // 검색 결과 수

			for (PickResult.Pick pick : pickList) {
				boolean containsAllTokens = searchTokenList.stream()
					.allMatch(token -> pick.title().toLowerCase().contains(token.toLowerCase()));
				assertThat(containsAllTokens).isTrue();
				assertThat(folderIdList).contains(pick.parentFolderId());
			}
		}

		@Test
		@DisplayName("폴더 : 일반, 제목 : T")
		void searchTest8() {
			// given
			List<Long> folderIdList = List.of(general1.getId());
			List<String> searchTokenList = List.of("T");
			List<Long> tagIdList = null;

			PickCommand.Search search = new PickCommand.Search(user1.getId(), folderIdList, searchTokenList, tagIdList,
				0L, 30);

			// when
			Slice<PickResult.Pick> pickList = pickSearchService.searchPick(search);

			// then
			assertThat(pickList).isNotNull();
			assertThat(pickList.getNumberOfElements()).isEqualTo(5); // 검색 결과 수

			for (PickResult.Pick pick : pickList) {
				boolean containsAllTokens = searchTokenList.stream()
					.allMatch(token -> pick.title().toLowerCase().contains(token.toLowerCase()));
				assertThat(containsAllTokens).isTrue();
				assertThat(folderIdList).contains(pick.parentFolderId());
			}
		}

		@Test
		@DisplayName("폴더 : 일반, 태그 : 3")
		void searchTest9() {
			// given
			List<Long> folderIdList = List.of(general1.getId());
			List<String> searchTokenList = null;
			List<Long> tagIdList = List.of(tag3.getId());

			PickCommand.Search search = new PickCommand.Search(user1.getId(), folderIdList, searchTokenList, tagIdList,
				0L, 30);

			// when
			Slice<PickResult.Pick> pickList = pickSearchService.searchPick(search);

			// then
			assertThat(pickList).isNotNull();
			assertThat(pickList.getNumberOfElements()).isEqualTo(10); // 검색 결과 수

			for (PickResult.Pick pick : pickList) {
				assertThat(pick.tagIdOrderedList()).containsAll(tagIdList);
				assertThat(folderIdList).contains(pick.parentFolderId());
			}
		}

		@Test
		@DisplayName("폴더 : 휴지통, 태그 : 3")
		void searchTest10() {
			// given
			List<Long> folderIdList = List.of(recycleBin1.getId());
			List<String> searchTokenList = null;
			List<Long> tagIdList = List.of(tag3.getId());

			PickCommand.Search search = new PickCommand.Search(user1.getId(), folderIdList, searchTokenList, tagIdList,
				0L, 30);

			// when
			Slice<PickResult.Pick> pickList = pickSearchService.searchPick(search);

			// then
			assertThat(pickList).isNotNull();
			assertThat(pickList.getNumberOfElements()).isEqualTo(0); // 검색 결과 수
		}
	}

	@Nested
	@DisplayName("제목 검색 테스트")
	class TitleSearchConditionTest {
		@Test
		@DisplayName("리액트")
		void titleSearchTest() {
			// given
			List<Long> folderIdList = null;
			List<String> searchTokenList = List.of("리액트");
			List<Long> tagIdList = null;

			PickCommand.Search search = new PickCommand.Search(user1.getId(), folderIdList, searchTokenList, tagIdList,
				0L, 30);

			// when
			Slice<PickResult.Pick> pickList = pickSearchService.searchPick(search);

			// then
			assertThat(pickList).isNotNull();
			assertThat(pickList.getNumberOfElements()).isEqualTo(10); // 검색 결과 수

			for (PickResult.Pick pick : pickList) {
				assertThat(pick.title()).contains(searchTokenList);
			}
		}

		@Test
		@DisplayName("스프링")
		void titleSearchTest2() {
			// given
			List<Long> folderIdList = null;
			List<String> searchTokenList = List.of("스프링");
			List<Long> tagIdList = null;

			PickCommand.Search search = new PickCommand.Search(user1.getId(), folderIdList, searchTokenList, tagIdList,
				0L, 30);

			// when
			Slice<PickResult.Pick> pickList = pickSearchService.searchPick(search);

			// then
			assertThat(pickList).isNotNull();
			assertThat(pickList.getNumberOfElements()).isEqualTo(20); // 검색 결과 수

			for (PickResult.Pick pick : pickList) {
				assertThat(pick.title()).contains(searchTokenList);
			}
		}

		@Test
		@DisplayName("Spring")
		void titleSearchTest3() {
			// given
			List<Long> folderIdList = null;
			List<String> searchTokenList = List.of("Spring");
			List<Long> tagIdList = null;

			PickCommand.Search search = new PickCommand.Search(user1.getId(), folderIdList, searchTokenList, tagIdList,
				0L, 30);

			// when
			Slice<PickResult.Pick> pickList = pickSearchService.searchPick(search);

			// then
			assertThat(pickList).isNotNull();
			assertThat(pickList.getNumberOfElements()).isEqualTo(10); // 검색 결과 수

			for (PickResult.Pick pick : pickList) {
				assertThat(pick.title()).contains(searchTokenList);
			}
		}

		@Test
		@DisplayName("S g")
		void titleSearchTest4() {
			// given
			List<Long> folderIdList = null;
			List<String> searchTokenList = List.of("S", "g");
			List<Long> tagIdList = null;

			PickCommand.Search search = new PickCommand.Search(user1.getId(), folderIdList, searchTokenList, tagIdList,
				0L, 30);

			// when
			Slice<PickResult.Pick> pickList = pickSearchService.searchPick(search);

			// then
			assertThat(pickList).isNotNull();
			assertThat(pickList.getNumberOfElements()).isEqualTo(10); // 검색 결과 수

			for (PickResult.Pick pick : pickList) {
				boolean containsAllTokens = searchTokenList.stream().allMatch(token -> pick.title().contains(token));
				assertThat(containsAllTokens).isTrue();
			}
		}

		@Test
		@DisplayName("S")
		void titleSearchTest5() {
			// given
			List<Long> folderIdList = null;
			List<String> searchTokenList = List.of("S");
			List<Long> tagIdList = null;

			PickCommand.Search search = new PickCommand.Search(user1.getId(), folderIdList, searchTokenList, tagIdList,
				0L, 30);

			// when
			Slice<PickResult.Pick> pickList = pickSearchService.searchPick(search);

			// then
			assertThat(pickList).isNotNull();
			assertThat(pickList.getNumberOfElements()).isEqualTo(10); // 검색 결과 수

			for (PickResult.Pick pick : pickList) {
				assertThat(pick.title()).contains(searchTokenList);
			}
		}

		@Test
		@DisplayName("g")
		void titleSearchTest6() {
			// given
			List<Long> folderIdList = null;
			List<String> searchTokenList = List.of("g");
			List<Long> tagIdList = null;

			PickCommand.Search search = new PickCommand.Search(user1.getId(), folderIdList, searchTokenList, tagIdList,
				0L, 30);

			// when
			Slice<PickResult.Pick> pickList = pickSearchService.searchPick(search);

			// then
			assertThat(pickList).isNotNull();
			assertThat(pickList.getNumberOfElements()).isEqualTo(10); // 검색 결과 수

			for (PickResult.Pick pick : pickList) {
				assertThat(pick.title()).contains(searchTokenList);
			}
		}

		@Test
		@DisplayName("스 링")
		void titleSearchTest7() {
			// given
			List<Long> folderIdList = null;
			List<String> searchTokenList = List.of("스", "링");
			List<Long> tagIdList = null;

			PickCommand.Search search = new PickCommand.Search(user1.getId(), folderIdList, searchTokenList, tagIdList,
				0L, 30);

			// when
			Slice<PickResult.Pick> pickList = pickSearchService.searchPick(search);

			// then
			assertThat(pickList).isNotNull();
			assertThat(pickList.getNumberOfElements()).isEqualTo(20); // 검색 결과 수

			for (PickResult.Pick pick : pickList) {
				boolean containsAllTokens = searchTokenList.stream().allMatch(token -> pick.title().contains(token));
				assertThat(containsAllTokens).isTrue();
			}
		}

		@Test
		@DisplayName("프링")
		void titleSearchTest8() {
			// given
			List<Long> folderIdList = null;
			List<String> searchTokenList = List.of("프링");
			List<Long> tagIdList = null;

			PickCommand.Search search = new PickCommand.Search(user1.getId(), folderIdList, searchTokenList, tagIdList,
				0L, 30);

			// when
			Slice<PickResult.Pick> pickList = pickSearchService.searchPick(search);

			// then
			assertThat(pickList).isNotNull();
			assertThat(pickList.getNumberOfElements()).isEqualTo(20); // 검색 결과 수

			for (PickResult.Pick pick : pickList) {
				assertThat(pick.title()).contains(searchTokenList);
			}
		}

		@Test
		@DisplayName("서버")
		void titleSearchTest9() {
			// given
			List<Long> folderIdList = null;
			List<String> searchTokenList = List.of("서버");
			List<Long> tagIdList = null;

			PickCommand.Search search = new PickCommand.Search(user1.getId(), folderIdList, searchTokenList, tagIdList,
				0L, 30);

			// when
			Slice<PickResult.Pick> pickList = pickSearchService.searchPick(search);

			// then
			assertThat(pickList).isNotNull();
			assertThat(pickList.getNumberOfElements()).isEqualTo(10); // 검색 결과 수

			for (PickResult.Pick pick : pickList) {
				assertThat(pick.title()).contains(searchTokenList);
			}
		}

		@Test
		@DisplayName("트")
		void titleSearchTest10() {
			// given
			List<Long> folderIdList = null;
			List<String> searchTokenList = List.of("트");
			List<Long> tagIdList = null;

			PickCommand.Search search = new PickCommand.Search(user1.getId(), folderIdList, searchTokenList, tagIdList,
				0L, 30);

			// when
			Slice<PickResult.Pick> pickList = pickSearchService.searchPick(search);

			// then
			assertThat(pickList).isNotNull();
			assertThat(pickList.getNumberOfElements()).isEqualTo(10); // 검색 결과 수

			for (PickResult.Pick pick : pickList) {
				assertThat(pick.title()).contains(searchTokenList);
			}
		}

		@Test
		@DisplayName("제목이 매우 긴 경우")
		void titleSearchTest11() {
			// given
			List<Long> folderIdList = null;
			List<String> searchTokenList = List.of("a".repeat(500)); // 500자 검색어
			List<Long> tagIdList = null;

			PickCommand.Search search = new PickCommand.Search(user1.getId(), folderIdList, searchTokenList, tagIdList,
				0L, 30);

			// when
			Slice<PickResult.Pick> pickList = pickSearchService.searchPick(search);

			// then
			assertThat(pickList).isNotNull();
			assertThat(pickList.getNumberOfElements()).isEqualTo(0); // 검색 결과 없음
		}

	}

	@Nested
	@DisplayName("폴더 검색 테스트")
	class FolderSearchConditionTest {

		@Test
		@DisplayName("미분류 폴더")
		void folderSearchTest1() {
			// given
			List<Long> folderIdList = List.of(unclassified1.getId());
			List<String> searchTokenList = null;
			List<Long> tagIdList = null;

			PickCommand.Search search = new PickCommand.Search(user1.getId(), folderIdList, searchTokenList, tagIdList,
				0L, 30);

			// when
			Slice<PickResult.Pick> pickList = pickSearchService.searchPick(search);

			// then
			assertThat(pickList).isNotNull();
			assertThat(pickList.getNumberOfElements()).isEqualTo(20); // 검색 결과 수

			for (PickResult.Pick pick : pickList) {
				assertThat(pick.parentFolderId()).isEqualTo(unclassified1.getId());
			}
		}

		@Test
		@DisplayName("일반 폴더 - React.js")
		void folderSearchTest2() {
			// given
			List<Long> folderIdList = List.of(general1.getId());
			List<String> searchTokenList = null;
			List<Long> tagIdList = null;

			PickCommand.Search search = new PickCommand.Search(user1.getId(), folderIdList, searchTokenList, tagIdList,
				0L, 30);

			// when
			Slice<PickResult.Pick> pickList = pickSearchService.searchPick(search);

			// then
			assertThat(pickList).isNotNull();
			assertThat(pickList.getNumberOfElements()).isEqualTo(10); // 검색 결과 수

			for (PickResult.Pick pick : pickList) {
				assertThat(pick.parentFolderId()).isEqualTo(general1.getId());
			}
		}

		@Test
		@DisplayName("휴지통 폴더")
		void folderSearchTest3() {
			// given
			List<Long> folderIdList = List.of(recycleBin1.getId());
			List<String> searchTokenList = null;
			List<Long> tagIdList = null;

			PickCommand.Search search = new PickCommand.Search(user1.getId(), folderIdList, searchTokenList, tagIdList,
				0L, 30);

			// when
			Slice<PickResult.Pick> pickList = pickSearchService.searchPick(search);

			// then
			assertThat(pickList).isNotNull();
			assertThat(pickList.getNumberOfElements()).isEqualTo(0); // 검색 결과 수

			for (PickResult.Pick pick : pickList) {
				assertThat(pick.parentFolderId()).isEqualTo(general1.getId());
			}
		}

		@Test
		@DisplayName("루트 폴더 - 검색 불가")
		void folderSearchTest4() {
			// given
			List<Long> folderIdList = List.of(root1.getId());
			List<String> searchTokenList = null;
			List<Long> tagIdList = null;

			PickCommand.Search search = new PickCommand.Search(user1.getId(), folderIdList, searchTokenList, tagIdList,
				0L, 30);

			// when, then
			assertThatThrownBy(() -> pickSearchService.searchPick(search))
				.isInstanceOf(ApiFolderException.class)
				.hasMessageStartingWith(ApiFolderException.ROOT_FOLDER_SEARCH_NOT_ALLOWED().getMessage());
		}

	}

	@Nested
	@DisplayName("태그 검색 테스트")
	class TagSearchConditionTest {

		@Test
		@DisplayName("태그 1")
		void tagSearchTest1() {
			// given
			List<Long> folderIdList = null;
			List<String> searchTokenList = null;
			List<Long> tagIdList = List.of(tag1.getId());

			PickCommand.Search search = new PickCommand.Search(user1.getId(), folderIdList, searchTokenList, tagIdList,
				0L, 30);

			// when
			Slice<PickResult.Pick> pickList = pickSearchService.searchPick(search);

			// then
			assertThat(pickList).isNotNull();
			assertThat(pickList.getNumberOfElements()).isEqualTo(30); // 검색 결과 수

			for (PickResult.Pick pick : pickList) {
				assertThat(pick.tagIdOrderedList()).contains(tag1.getId()); // 태그 조건 확인
			}
		}

		@Test
		@DisplayName("태그 2")
		void tagSearchTest2() {
			// given
			List<Long> folderIdList = null;
			List<String> searchTokenList = null;
			List<Long> tagIdList = List.of(tag2.getId());

			PickCommand.Search search = new PickCommand.Search(user1.getId(), folderIdList, searchTokenList, tagIdList,
				0L, 30);

			// when
			Slice<PickResult.Pick> pickList = pickSearchService.searchPick(search);

			// then
			assertThat(pickList).isNotNull();
			assertThat(pickList.getNumberOfElements()).isEqualTo(20); // 검색 결과 수

			for (PickResult.Pick pick : pickList) {
				assertThat(pick.tagIdOrderedList()).contains(tag2.getId()); // 태그 조건 확인
			}
		}

		@Test
		@DisplayName("태그 3")
		void tagSearchTest3() {
			// given
			List<Long> folderIdList = null;
			List<String> searchTokenList = null;
			List<Long> tagIdList = List.of(tag3.getId());

			PickCommand.Search search = new PickCommand.Search(user1.getId(), folderIdList, searchTokenList, tagIdList,
				0L, 30);

			// when
			Slice<PickResult.Pick> pickList = pickSearchService.searchPick(search);

			// then
			assertThat(pickList).isNotNull();
			assertThat(pickList.getNumberOfElements()).isEqualTo(20); // 검색 결과 수

			for (PickResult.Pick pick : pickList) {
				assertThat(pick.tagIdOrderedList()).contains(tag3.getId()); // 태그 조건 확인
			}
		}

		@Test
		@DisplayName("태그 1, 2")
		void tagSearchTest4() {
			// given
			List<Long> folderIdList = null;
			List<String> searchTokenList = null;
			List<Long> tagIdList = List.of(tag1.getId(), tag2.getId());

			PickCommand.Search search = new PickCommand.Search(user1.getId(), folderIdList, searchTokenList, tagIdList,
				0L, 30);

			// when
			Slice<PickResult.Pick> pickList = pickSearchService.searchPick(search);

			// then
			assertThat(pickList).isNotNull();
			assertThat(pickList.getNumberOfElements()).isEqualTo(20); // 검색 결과 수

			for (PickResult.Pick pick : pickList) {
				assertThat(pick.tagIdOrderedList()).containsAll(tagIdList); // 태그 조건 확인
			}
		}

		@Test
		@DisplayName("태그 1, 3")
		void tagSearchTest5() {
			// given
			List<Long> folderIdList = null;
			List<String> searchTokenList = null;
			List<Long> tagIdList = List.of(tag1.getId(), tag3.getId());

			PickCommand.Search search = new PickCommand.Search(user1.getId(), folderIdList, searchTokenList, tagIdList,
				0L, 30);

			// when
			Slice<PickResult.Pick> pickList = pickSearchService.searchPick(search);

			// then
			assertThat(pickList).isNotNull();
			assertThat(pickList.getNumberOfElements()).isEqualTo(20); // 검색 결과 수

			for (PickResult.Pick pick : pickList) {
				assertThat(pick.tagIdOrderedList()).containsAll(tagIdList); // 태그 조건 확인
			}
		}

		@Test
		@DisplayName("태그 2, 3")
		void tagSearchTest6() {
			// given
			List<Long> folderIdList = null;
			List<String> searchTokenList = null;
			List<Long> tagIdList = List.of(tag2.getId(), tag3.getId());

			PickCommand.Search search = new PickCommand.Search(user1.getId(), folderIdList, searchTokenList, tagIdList,
				0L, 30);

			// when
			Slice<PickResult.Pick> pickList = pickSearchService.searchPick(search);

			// then
			assertThat(pickList).isNotNull();
			assertThat(pickList.getNumberOfElements()).isEqualTo(10); // 검색 결과 수

			for (PickResult.Pick pick : pickList) {
				assertThat(pick.tagIdOrderedList()).containsAll(tagIdList); // 태그 조건 확인
			}
		}

		@Test
		@DisplayName("태그 1, 2, 3")
		void tagSearchTest7() {
			// given
			List<Long> folderIdList = null;
			List<String> searchTokenList = null;
			List<Long> tagIdList = List.of(tag1.getId(), tag2.getId(), tag3.getId());

			PickCommand.Search search = new PickCommand.Search(user1.getId(), folderIdList, searchTokenList, tagIdList,
				0L, 30);

			// when
			Slice<PickResult.Pick> pickList = pickSearchService.searchPick(search);

			// then
			assertThat(pickList).isNotNull();
			assertThat(pickList.getNumberOfElements()).isEqualTo(10); // 검색 결과 수

			for (PickResult.Pick pick : pickList) {
				assertThat(pick.tagIdOrderedList()).containsAll(tagIdList); // 태그 조건 확인
			}
		}
	}

	@Nested
	@DisplayName("존재 여부 및 예외 테스트")
	class exceptionTest {

		@Test
		@DisplayName("존재하지 않는 폴더")
		void exceptionTest1() {
			// given
			List<Long> folderIdList = List.of(999L);
			List<String> searchTokenList = null;
			List<Long> tagIdList = null;

			PickCommand.Search search = new PickCommand.Search(user1.getId(), folderIdList, searchTokenList, tagIdList,
				0L, 30);

			// when, then
			assertThatThrownBy(() -> pickSearchService.searchPick(search))
				.isInstanceOf(ApiFolderException.class)
				.hasMessageStartingWith(ApiFolderException.FOLDER_NOT_FOUND().getMessage());
		}

		@Test
		@DisplayName("존재하지 않는 제목")
		void exceptionTest2() {
			// given
			List<Long> folderIdList = null;
			List<String> searchTokenList = List.of("검색결과가없음");
			List<Long> tagIdList = null;

			PickCommand.Search search = new PickCommand.Search(user1.getId(), folderIdList, searchTokenList, tagIdList,
				0L, 30);

			// when
			Slice<PickResult.Pick> pickList = pickSearchService.searchPick(search);

			// then
			assertThat(pickList).isNotNull();
			assertThat(pickList.getNumberOfElements()).isEqualTo(0); // 검색 결과 수
		}

		@Test
		@DisplayName("존재하지 않는 제목, 태그")
		void exceptionTest3() {
			// given
			List<Long> folderIdList = null;
			List<String> searchTokenList = List.of("검색결과가없음");
			List<Long> tagIdList = List.of(999L);

			PickCommand.Search search = new PickCommand.Search(user1.getId(), folderIdList, searchTokenList, tagIdList,
				0L, 30);

			// when, then
			assertThatThrownBy(() -> pickSearchService.searchPick(search))
				.isInstanceOf(ApiTagException.class)
				.hasMessageStartingWith(ApiTagException.TAG_NOT_FOUND().getMessage());
		}

		@Test
		@DisplayName("다른 유저의 폴더 리스트 검색")
		void exceptionTest4() {
			// given
			List<Long> folderIdList = List.of(unclassified2.getId());
			List<String> searchTokenList = null;
			List<Long> tagIdList = null;

			PickCommand.Search search = new PickCommand.Search(user1.getId(), folderIdList, searchTokenList, tagIdList,
				0L, 30);

			// when, then
			assertThatThrownBy(() -> pickSearchService.searchPick(search))
				.isInstanceOf(ApiFolderException.class)
				.hasMessageStartingWith(ApiFolderException.FOLDER_ACCESS_DENIED().getMessage());
		}

		@Test
		@DisplayName("다른 유저의 태그 리스트 검색")
		void exceptionTest5() {
			// given
			List<Long> folderIdList = null;
			List<String> searchTokenList = null;
			List<Long> tagIdList = List.of(tag4.getId());

			PickCommand.Search search = new PickCommand.Search(user1.getId(), folderIdList, searchTokenList, tagIdList,
				0L, 30);

			// when, then
			assertThatThrownBy(() -> pickSearchService.searchPick(search))
				.isInstanceOf(ApiTagException.class)
				.hasMessageStartingWith(ApiTagException.UNAUTHORIZED_TAG_ACCESS().getMessage());
		}
	}

	private void saveUser1TestPick() {
		for (int i = 0; i < 10; i++) {
			LinkInfo linkInfo = new LinkInfo("리액트" + i, "링크 제목", "링크 설명", "링크 이미지 url", null);
			PickCommand.Create command = new PickCommand.Create(user1.getId(), "리액트" + i + "서버" + i + "스프링",
				List.of(tag1.getId(), tag2.getId()), unclassified1.getId(), linkInfo);
			pickService.saveNewPick(command);
		}

		for (int i = 0; i < 10; i++) {
			LinkInfo linkInfo = new LinkInfo("스프링" + i, "링크 제목", "링크 설명", "링크 이미지 url", null);
			PickCommand.Create command = new PickCommand.Create(user1.getId(), "스프링" + i,
				List.of(tag1.getId(), tag2.getId(), tag3.getId()), unclassified1.getId(), linkInfo);
			pickService.saveNewPick(command);
		}

		for (int i = 0; i < 5; i++) {
			LinkInfo linkInfo = new LinkInfo("Spring" + i, "링크 제목", "링크 설명", "링크 이미지 url", null);
			PickCommand.Create command = new PickCommand.Create(user1.getId(), "Spring" + i,
				List.of(tag1.getId(), tag3.getId()), general1.getId(), linkInfo);
			pickService.saveNewPick(command);
		}

		for (int i = 0; i < 5; i++) {
			LinkInfo linkInfo = new LinkInfo("Test" + i, "링크 제목", "링크 설명", "링크 이미지 url", null);
			PickCommand.Create command = new PickCommand.Create(user1.getId(), "Test" + i,
				List.of(tag1.getId(), tag3.getId()), general1.getId(), linkInfo);
			pickService.saveNewPick(command);
		}
	}

	private void saveUser2TestPick() {
		for (int i = 0; i < 5; i++) {
			LinkInfo linkInfo = new LinkInfo("user2" + i, "링크 제목", "링크 설명", "링크 이미지 url", null);
			PickCommand.Create command = new PickCommand.Create(user2.getId(), "Backend",
				List.of(tag4.getId(), tag5.getId()), unclassified2.getId(), linkInfo);
			pickService.saveNewPick(command);
		}

		for (int i = 0; i < 5; i++) {
			LinkInfo linkInfo = new LinkInfo("user2s" + i, "링크 제목", "링크 설명", "링크 이미지 url", null);
			PickCommand.Create command = new PickCommand.Create(user2.getId(), "Frontend",
				List.of(tag6.getId()), unclassified2.getId(), linkInfo);
			pickService.saveNewPick(command);
		}
	}

	private void saveTestTag(TagRepository tagRepository) {
		// save test tag
		tag1 = tagRepository.save(Tag.builder().user(user1).name("tag1").colorNumber(1).build());
		tag2 = tagRepository.save(Tag.builder().user(user1).name("tag2").colorNumber(1).build());
		tag3 = tagRepository.save(Tag.builder().user(user1).name("tag3").colorNumber(1).build());

		tag4 = tagRepository.save(Tag.builder().user(user2).name("tag4").colorNumber(1).build());
		tag5 = tagRepository.save(Tag.builder().user(user2).name("tag5").colorNumber(1).build());
		tag6 = tagRepository.save(Tag.builder().user(user2).name("tag6").colorNumber(1).build());
	}

	private void saveTestFolder(FolderRepository folderRepository) {
		// save test folder
		root1 = folderRepository.save(Folder.createEmptyRootFolder(user1));
		recycleBin1 = folderRepository.save(Folder.createEmptyRecycleBinFolder(user1));
		unclassified1 = folderRepository.save(Folder.createEmptyUnclassifiedFolder(user1));
		general1 = folderRepository.save(Folder.createEmptyGeneralFolder(user1, root1, "React.js"));

		root2 = folderRepository.save(Folder.createEmptyRootFolder(user2));
		recycleBin2 = folderRepository.save(Folder.createEmptyRecycleBinFolder(user2));
		unclassified2 = folderRepository.save(Folder.createEmptyUnclassifiedFolder(user2));
		general2 = folderRepository.save(Folder.createEmptyGeneralFolder(user2, root2, "Backend"));
	}

	private void saveTestUser(UserRepository userRepository) {
		// save test user
		user1 = userRepository.save(
			User.builder()
				.email("user1@test.com")
				.nickname("user1")
				.password("user1")
				.role(Role.ROLE_USER)
				.socialProvider(SocialType.KAKAO)
				.socialProviderId("1")
				.tagOrderList(new ArrayList<>())
				.build()
		);

		// save test user
		user2 = userRepository.save(
			User.builder()
				.email("user2@test.com")
				.nickname("user2")
				.password("user2")
				.role(Role.ROLE_USER)
				.socialProvider(SocialType.KAKAO)
				.socialProviderId("2")
				.tagOrderList(new ArrayList<>())
				.build()
		);
	}
}