package techpick.api.infrastructure.pick;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Slice;
import org.springframework.test.context.ActiveProfiles;

import lombok.extern.slf4j.Slf4j;
import techpick.TechPickApiApplication;
import techpick.api.domain.link.dto.LinkInfo;
import techpick.api.domain.pick.dto.PickCommand;
import techpick.api.domain.pick.dto.PickResult;
import techpick.api.domain.pick.service.PickService;
import techpick.core.model.folder.Folder;
import techpick.core.model.folder.FolderRepository;
import techpick.core.model.pick.Pick;
import techpick.core.model.tag.Tag;
import techpick.core.model.tag.TagRepository;
import techpick.core.model.user.Role;
import techpick.core.model.user.SocialType;
import techpick.core.model.user.User;
import techpick.core.model.user.UserRepository;

@Slf4j
@SpringBootTest(classes = TechPickApiApplication.class)
@ActiveProfiles("local")
class PickQueryTest {

	@Autowired
	private PickQuery pickQuery;

	@Autowired
	PickService pickService;

	User user;
	Folder root, recycleBin, unclassified, general;
	Tag tag1, tag2, tag3;

	@BeforeEach
	void setUp(
		@Autowired UserRepository userRepository,
		@Autowired FolderRepository folderRepository,
		@Autowired TagRepository tagRepository
	) {
		// save test user
		user = userRepository.save(
			User.builder()
				.email("test@test.com")
				.nickname("test")
				.password("test")
				.role(Role.ROLE_USER)
				.socialProvider(SocialType.KAKAO)
				.socialProviderId("1")
				.tagOrderList(new ArrayList<>())
				.build()
		);

		// save test folder
		root = folderRepository.save(Folder.createEmptyRootFolder(user));
		recycleBin = folderRepository.save(Folder.createEmptyRecycleBinFolder(user));
		unclassified = folderRepository.save(Folder.createEmptyUnclassifiedFolder(user));
		general = folderRepository.save(Folder.createEmptyGeneralFolder(user, root, "React.js"));

		// save tag
		tag1 = tagRepository.save(Tag.builder().user(user).name("tag1").colorNumber(1).build());
		tag2 = tagRepository.save(Tag.builder().user(user).name("tag2").colorNumber(1).build());
		tag3 = tagRepository.save(Tag.builder().user(user).name("tag3").colorNumber(1).build());

		for (int i = 0; i < 10; i++) {
			LinkInfo linkInfo = new LinkInfo("리액트" + i, "링크 제목", "링크 설명", "링크 이미지 url", null);
			PickCommand.Create command = new PickCommand.Create(user.getId(), "리액트" + i + "서버" + i + "스프링",
				List.of(tag1.getId(), tag2.getId()),
				unclassified.getId(), linkInfo);
			pickService.saveNewPick(command);
		}

		for (int i = 0; i < 10; i++) {
			LinkInfo linkInfo = new LinkInfo("스프링" + i, "링크 제목", "링크 설명", "링크 이미지 url", null);
			PickCommand.Create command = new PickCommand.Create(user.getId(), "스프링" + i,
				List.of(tag1.getId(), tag2.getId(), tag3.getId()),
				unclassified.getId(), linkInfo);
			pickService.saveNewPick(command);
		}
	}

	@Test
	void test() {
		List<Long> pickIdList = List.of(2L, 1L, 3L);
		List<PickResult.Pick> pickList = pickQuery.getPickList(user.getId(), pickIdList);
		for (PickResult.Pick pick : pickList) {
			log.info("pick : {}", pick);
		}
	}

	@Test
	void searchTest() {
		// 검색 1
		List<Long> folderIdList1 = List.of(unclassified.getId(), recycleBin.getId(), root.getId());
		List<String> searchTokenList1 = List.of("리액트", "서버", "스프링");
		List<Long> tagIdList1 = List.of(tag1.getId(), tag3.getId());

		// 해당하는 태그가 없기 때문에 출력 값이 없음.
		Slice<PickResult.Pick> pickList1 = pickQuery.searchPick(user.getId(), folderIdList1, searchTokenList1,
			tagIdList1, 0L, 20);
		for (PickResult.Pick pick : pickList1.getContent()) {
			log.info("search1 : {}", pick);
		}

		// ------------------------------------------------------------------------------------

		// 검색 2
		List<Long> folderIdList2 = List.of(unclassified.getId());
		List<String> searchTokenList2 = List.of("스프링");
		List<Long> tagIdList2 = List.of(tag1.getId());

		Slice<PickResult.Pick> pickList2 = pickQuery.searchPick(user.getId(), folderIdList2, searchTokenList2,
			tagIdList2, 0L, 20);
		for (PickResult.Pick pick : pickList2.getContent()) {
			log.info("search2 : {}", pick);
		}

		// ------------------------------------------------------------------------------------

		// 검색 3
		List<Long> folderIdList3 = List.of(unclassified.getId());
		List<String> searchTokenList3 = List.of("스 링");
		List<Long> tagIdList3 = List.of(tag1.getId());

		Slice<PickResult.Pick> pickList3 = pickQuery.searchPick(user.getId(), folderIdList3, searchTokenList3,
			tagIdList3, 0L, 20);
		for (PickResult.Pick pick : pickList3.getContent()) {
			log.info("search3 : {}", pick);
		}

		// ------------------------------------------------------------------------------------

		// 검색 4 - pickId, search, tag null
		List<Long> folderIdList4 = new ArrayList<>();
		List<String> searchTokenList4 = new ArrayList<>();
		List<Long> tagIdList4 = new ArrayList<>();

		Slice<PickResult.Pick> pickList4 = pickQuery.searchPick(user.getId(), folderIdList4, searchTokenList4,
			tagIdList4, 0L, 20);
		for (PickResult.Pick pick : pickList4.getContent()) {
			log.info("search4 : {}", pick);
		}

		// ------------------------------------------------------------------------------------

		// 검색 5 - search만 not null
		List<Long> folderIdList5 = new ArrayList<>();
		List<String> searchTokenList5 = List.of("리액트");
		List<Long> tagIdList5 = new ArrayList<>();

		Slice<PickResult.Pick> pickList5 = pickQuery.searchPick(user.getId(), folderIdList5, searchTokenList5,
			tagIdList5, 0L, 20);
		for (PickResult.Pick pick : pickList5.getContent()) {
			log.info("search5 : {}", pick);
		}
	}
}