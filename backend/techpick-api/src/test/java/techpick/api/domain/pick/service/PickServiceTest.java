package techpick.api.domain.pick.service;

import static org.assertj.core.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicInteger;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;

import lombok.extern.slf4j.Slf4j;
import techpick.TechPickApiApplication;
import techpick.api.application.pick.dto.PickApiMapper;
import techpick.api.application.pick.dto.PickApiRequest;
import techpick.api.domain.link.dto.LinkInfo;
import techpick.api.domain.pick.dto.PickCommand;
import techpick.api.domain.pick.dto.PickResult;
import techpick.api.domain.pick.exception.ApiPickException;
import techpick.api.domain.tag.dto.TagCommand;
import techpick.api.domain.tag.service.TagService;
import techpick.api.infrastructure.pick.PickDataHandler;
import techpick.core.model.folder.Folder;
import techpick.core.model.folder.FolderRepository;
import techpick.core.model.link.LinkRepository;
import techpick.core.model.pick.PickRepository;
import techpick.core.model.pick.PickTag;
import techpick.core.model.pick.PickTagRepository;
import techpick.core.model.tag.Tag;
import techpick.core.model.tag.TagRepository;
import techpick.core.model.user.Role;
import techpick.core.model.user.SocialType;
import techpick.core.model.user.User;
import techpick.core.model.user.UserRepository;

@Slf4j
@SpringBootTest(classes = TechPickApiApplication.class)
@ActiveProfiles("test")
class PickServiceTest {

	@Autowired
	PickService pickService;
	@Autowired
	PickDataHandler pickDataHandler;
	@Autowired
	TagService tagService;
	@Autowired
	PickApiMapper pickApiMapper;

	User user;
	Folder root, recycleBin, unclassified, general;
	Tag tag1, tag2, tag3;

	@BeforeEach
		// TODO: change to Adaptor
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
	}

	@AfterEach
		// TODO: change to Adaptor (repository 말고!)
	void cleanUp(
		@Autowired UserRepository userRepository,
		@Autowired FolderRepository folderRepository,
		@Autowired TagRepository tagRepository,
		@Autowired PickRepository pickRepository,
		@Autowired PickTagRepository pickTagRepository,
		@Autowired LinkRepository linkRepository
	) {
		// NOTE: 제거 순서 역시 FK 제약 조건을 신경써야 한다.
		pickTagRepository.deleteAll();
		pickRepository.deleteAll();
		userRepository.deleteAll(); // TODO: soft delete 이라 DB를 직접 비워야 한다.
		folderRepository.deleteAll();
		tagRepository.deleteAll();
		linkRepository.deleteAll();
	}

	@Nested
	@DisplayName("픽 조회")
	class getPick {
		@Test
		@DisplayName("""
			    저장한 픽이 정상적으로 조회되어야 한다.
			""")
		void pick_save_and_read_test() {
			// given
			LinkInfo linkInfo = new LinkInfo("linkUrl", "linkTitle", "linkDescription", "imageUrl", null);
			List<Long> tagOrder = List.of(tag1.getId(), tag2.getId(), tag3.getId());
			PickCommand.Create command = new PickCommand.Create(
				user.getId(), "PICK", "MEMO",
				tagOrder, unclassified.getId(), linkInfo
			);

			// when
			PickResult.Pick saveResult = pickService.saveNewPick(command);
			PickResult.Pick readResult = pickService.getPick(new PickCommand.Read(user.getId(), saveResult.id()));

			// then
			assertThat(readResult).isNotNull();
			assertThat(readResult).isEqualTo(saveResult);
		}

		@Test
		@DisplayName("폴더 리스트 id가 넘어오면, 각 폴더 내부에 있는 픽 리스트들을 조회한다.")
		void folder_list_in_pick_list_test() {
			// given
			LinkInfo linkInfo1 = new LinkInfo("linkUrl1", "linkTitle", "linkDescription", "imageUrl", null);
			LinkInfo linkInfo2 = new LinkInfo("linkUrl2", "linkTitle", "linkDescription", "imageUrl", null);
			LinkInfo linkInfo3 = new LinkInfo("linkUrl3", "linkTitle", "linkDescription", "imageUrl", null);
			LinkInfo linkInfo4 = new LinkInfo("linkUrl4", "linkTitle", "linkDescription", "imageUrl", null);
			LinkInfo linkInfo5 = new LinkInfo("linkUrl5", "linkTitle", "linkDescription", "imageUrl", null);

			List<Long> tagOrder = List.of(tag1.getId(), tag2.getId(), tag3.getId());
			PickCommand.Create command1 = new PickCommand.Create(user.getId(), "PICK", "MEMO", tagOrder,
				recycleBin.getId(), linkInfo1);
			PickCommand.Create command2 = new PickCommand.Create(user.getId(), "PICK", "MEMO", tagOrder,
				unclassified.getId(), linkInfo2);
			PickCommand.Create command3 = new PickCommand.Create(user.getId(), "PICK", "MEMO", tagOrder,
				unclassified.getId(), linkInfo3);
			PickCommand.Create command4 = new PickCommand.Create(user.getId(), "PICK", "MEMO", tagOrder,
				general.getId(), linkInfo4);
			PickCommand.Create command5 = new PickCommand.Create(user.getId(), "PICK", "MEMO", tagOrder,
				unclassified.getId(), linkInfo5);

			PickResult.Pick pick1 = pickService.saveNewPick(command1);
			PickResult.Pick pick2 = pickService.saveNewPick(command2);
			PickResult.Pick pick3 = pickService.saveNewPick(command3);
			PickResult.Pick pick4 = pickService.saveNewPick(command4);
			PickResult.Pick pick5 = pickService.saveNewPick(command5);

			List<Long> folderIdList = List.of(unclassified.getId(), general.getId(), recycleBin.getId());
			List<String> searchTokenList = List.of("리액트", "쿼리", "서버");

			PickCommand.Search searchCommand = pickApiMapper.toSearchCommand(user.getId(), folderIdList,
				searchTokenList);

			// when
			List<PickResult.PickList> pickList = pickService.getFolderListChildPickList(searchCommand);

			for (PickResult.PickList list : pickList) {
				log.info("list: {} ", list.toString());
			}

			// then
			assertThat(pickList.get(0).pickList().size()).isEqualTo(3); // unclassified
			assertThat(pickList.get(1).pickList().size()).isEqualTo(1); // general
			assertThat(pickList.get(2).pickList().size()).isEqualTo(1); // recycleBin

			assertThat(pickList.get(0).pickList().get(0).id()).isEqualTo(pick2.id()); // unclassified
			assertThat(pickList.get(0).pickList().get(1).id()).isEqualTo(pick3.id());
			assertThat(pickList.get(0).pickList().get(2).id()).isEqualTo(pick5.id());

			assertThat(pickList.get(1).pickList().get(0).id()).isEqualTo(pick4.id()); // general

			assertThat(pickList.get(2).pickList().get(0).id()).isEqualTo(pick1.id()); // recycleBin
		}
	}

	@Nested
	@DisplayName("픽 생성")
	class savePick {
		@Test
		@DisplayName("이미 픽한 링크에 대해 중복으로 픽한 경우, 실패해야 한다.")
		void create_duplicate_pick_test() {
			// given
			LinkInfo linkInfo = new LinkInfo("linkUrl", "linkTitle", "linkDescription", "imageUrl", null);
			List<Long> tagOrder = List.of(tag1.getId(), tag2.getId(), tag3.getId());
			PickCommand.Create command = new PickCommand.Create(
				user.getId(), "PICK", "MEMO",
				tagOrder, unclassified.getId(), linkInfo
			);

			// when
			pickService.saveNewPick(command);

			// then
			assertThatThrownBy(() -> pickService.saveNewPick(command))
				.isInstanceOf(ApiPickException.class)
				.hasMessageStartingWith(ApiPickException.PICK_MUST_BE_UNIQUE_FOR_A_URL().getMessage());
		}

		@Test
		@DisplayName("루트에 픽을 저장하는 경우, 실패해야 한다. - 루트는 폴더만 위치할 수 있다.")
		void create_root_pick_test() {
			// given
			LinkInfo linkInfo = new LinkInfo("linkUrl", "linkTitle", "linkDescription", "imageUrl", null);
			List<Long> tagOrder = List.of(tag1.getId(), tag2.getId(), tag3.getId());
			PickCommand.Create command = new PickCommand.Create(
				user.getId(), "PICK", "MEMO",
				tagOrder, null, linkInfo
			);

			// when, then
			assertThatThrownBy(() -> pickService.saveNewPick(command))
				.isInstanceOf(ApiPickException.class)
				.hasMessageStartingWith(ApiPickException.PICK_UNAUTHORIZED_ROOT_ACCESS().getMessage());
		}

		@Test
		@DirtiesContext
		@DisplayName("""
			    동시적으로 Pick 생성 요청이 들어올 경우, 하나만 생성되고 나머지는 실패해야 한다.
			""")
		void create_multiple_pick_concurrent_test() throws InterruptedException {
			// given
			int threadCount = 10;
			ExecutorService executorService = Executors.newFixedThreadPool(threadCount);
			CountDownLatch countDownLatch = new CountDownLatch(threadCount);

			AtomicInteger successCount = new AtomicInteger();
			AtomicInteger failCount = new AtomicInteger();

			LinkInfo linkInfo = new LinkInfo("linkUrl", "linkTitle", "linkDescription", "imageUrl", null);
			List<Long> tagOrder = List.of(tag1.getId(), tag2.getId(), tag3.getId());

			// when
			for (int i = 0; i < threadCount; i++) {
				executorService.submit(() -> {
					try {
						PickCommand.Create command = new PickCommand.Create(
							user.getId(), "PICK", "MEMO",
							tagOrder, unclassified.getId(), linkInfo
						);
						pickService.saveNewPick(command);
						successCount.incrementAndGet(); // 성공 카운트
					} catch (Exception e) {
						log.info("PickService Exception : {}", e.getMessage());
						failCount.incrementAndGet(); // 실패 카운트
					} finally {
						countDownLatch.countDown();
					}
				});
			}

			countDownLatch.await(); // 모든 스레드가 완료될 때까지 대기
			executorService.shutdown();

			// then
			log.info("success : {} ", successCount.get());
			log.info("fail : {} ", failCount.get());

			assertThat(successCount.get()).isEqualTo(1);
			assertThat(failCount.get()).isEqualTo(threadCount - 1);
		}
	}

	@Nested
	@DisplayName("픽 수정")
	class updatePick {
		@Test
		@DisplayName("""
			   픽의 제목, 메모는 null 값이 들어오면 수정을 하지 않는다.
			   모두 null 값이 들어올 경우 아무 일도 발생하지 않는다.
			""")
		void update_data_with_null_test() {
			// given
			LinkInfo linkInfo = new LinkInfo("linkUrl", "linkTitle", "linkDescription", "imageUrl", null);
			List<Long> tagOrder = List.of(tag1.getId(), tag2.getId(), tag3.getId());
			PickCommand.Create command = new PickCommand.Create(
				user.getId(), "PICK", "MEMO",
				tagOrder, unclassified.getId(), linkInfo
			);
			PickResult.Pick savePick = pickService.saveNewPick(command);

			// when
			String newTitle = "NEW_PICK";
			List<Long> newTagOrder = List.of(tag3.getId(), tag2.getId(), tag1.getId());
			PickCommand.Update updateCommand = new PickCommand.Update(
				user.getId(), savePick.id(),
				newTitle, null /* memo not changed */, newTagOrder
			);
			PickResult.Pick updatePick = pickService.updatePick(updateCommand);

			// then
			assertThat(updatePick.title()).isNotEqualTo(savePick.title()).isEqualTo(newTitle); // changed
			assertThat(updatePick.tagOrderList()).isNotEqualTo(savePick.tagOrderList())
				.isEqualTo(newTagOrder); // changed
			assertThat(updatePick.memo()).isEqualTo(savePick.memo()); // unchanged
		}
	}

	@Nested
	@DisplayName("픽 이동")
	class movePick {
		@Test
		@DisplayName("""
			    같은 폴더 내에서 픽의 순서를 이동한 후
			    그 이동된 부모 폴더의 자식 리스트 획득을 할 수 있어야 한다.
			    그리고 그 자식 리스트는 순서 정보가 올바르게 설정되어야 한다.
			""")
		void move_pick_to_same_folder_test() {
			// given
			LinkInfo linkInfo1 = new LinkInfo("linkUrl1", "linkTitle", "linkDescription", "imageUrl", null);
			LinkInfo linkInfo2 = new LinkInfo("linkUrl2", "linkTitle", "linkDescription", "imageUrl", null);
			LinkInfo linkInfo3 = new LinkInfo("linkUrl3", "linkTitle", "linkDescription", "imageUrl", null);
			LinkInfo linkInfo4 = new LinkInfo("linkUrl4", "linkTitle", "linkDescription", "imageUrl", null);
			LinkInfo linkInfo5 = new LinkInfo("linkUrl5", "linkTitle", "linkDescription", "imageUrl", null);

			List<Long> tagOrder = List.of(tag1.getId(), tag2.getId(), tag3.getId());
			PickCommand.Create command1 = new PickCommand.Create(user.getId(), "PICK", "MEMO", tagOrder,
				unclassified.getId(), linkInfo1);
			PickCommand.Create command2 = new PickCommand.Create(user.getId(), "PICK", "MEMO", tagOrder,
				unclassified.getId(), linkInfo2);
			PickCommand.Create command3 = new PickCommand.Create(user.getId(), "PICK", "MEMO", tagOrder,
				unclassified.getId(), linkInfo3);
			PickCommand.Create command4 = new PickCommand.Create(user.getId(), "PICK", "MEMO", tagOrder,
				unclassified.getId(), linkInfo4);
			PickCommand.Create command5 = new PickCommand.Create(user.getId(), "PICK", "MEMO", tagOrder,
				unclassified.getId(), linkInfo5);

			PickResult.Pick pick1 = pickService.saveNewPick(command1);
			PickResult.Pick pick2 = pickService.saveNewPick(command2);
			PickResult.Pick pick3 = pickService.saveNewPick(command3);
			PickResult.Pick pick4 = pickService.saveNewPick(command4);
			PickResult.Pick pick5 = pickService.saveNewPick(command5);

			List<Long> originalPickIdList = List.of(pick1.id(), pick2.id(), pick3.id(),
				pick4.id(), pick5.id());
			List<Long> movePickIdList = List.of(pick2.id(), pick3.id(), pick1.id());

			PickCommand.Move command = new PickCommand.Move(user.getId(), movePickIdList, unclassified.getId(), 0);

			// when
			pickService.movePick(command);

			List<PickResult.Pick> movedPickList = pickService.getFolderChildPickList(user.getId(),
				unclassified.getId());

			// then
			// 결과값 : [1, 2, 3, 4, 5] -> [2, 3, 1, 4, 5]
			assertThat(originalPickIdList).isNotEqualTo(movedPickList);
			assertThat(originalPickIdList.get(0)).isEqualTo(movedPickList.get(2).id());
			assertThat(originalPickIdList.get(1)).isEqualTo(movedPickList.get(0).id());
			assertThat(originalPickIdList.get(2)).isEqualTo(movedPickList.get(1).id());
		}

		@Test
		@DisplayName("""
			    다른 폴더 내에서 픽의 순서를 이동한 후
			    그 이동된 부모 폴더의 자식 리스트 획득을 할 수 있어야 한다.
			    그리고 그 자식 리스트는 순서 정보가 올바르게 설정되어야 한다.
			""")
		void move_pick_to_other_folder_test() {
			// given
			LinkInfo linkInfo1 = new LinkInfo("linkUrl1", "linkTitle", "linkDescription", "imageUrl", null);
			LinkInfo linkInfo2 = new LinkInfo("linkUrl2", "linkTitle", "linkDescription", "imageUrl", null);
			LinkInfo linkInfo3 = new LinkInfo("linkUrl3", "linkTitle", "linkDescription", "imageUrl", null);
			List<Long> tagOrder = List.of(tag1.getId(), tag2.getId(), tag3.getId());
			PickCommand.Create command1 = new PickCommand.Create(user.getId(), "PICK", "MEMO", tagOrder,
				unclassified.getId(), linkInfo1);
			PickCommand.Create command2 = new PickCommand.Create(user.getId(), "PICK", "MEMO", tagOrder,
				unclassified.getId(), linkInfo2);
			PickCommand.Create command3 = new PickCommand.Create(user.getId(), "PICK", "MEMO", tagOrder,
				unclassified.getId(), linkInfo3);

			PickResult.Pick pick1 = pickService.saveNewPick(command1);
			PickResult.Pick pick2 = pickService.saveNewPick(command2);
			PickResult.Pick pick3 = pickService.saveNewPick(command3);

			List<Long> movePickIdList = List.of(pick3.id(), pick2.id());
			PickCommand.Move command = new PickCommand.Move(user.getId(), movePickIdList, general.getId(), 0);

			PickCommand.Read readCommand1 = new PickCommand.Read(user.getId(), pick1.id());
			PickCommand.Read readCommand2 = new PickCommand.Read(user.getId(), pick2.id());
			PickCommand.Read readCommand3 = new PickCommand.Read(user.getId(), pick3.id());

			// when
			pickService.movePick(command);

			PickResult.Pick readPick1 = pickService.getPick(readCommand1);
			PickResult.Pick readPick2 = pickService.getPick(readCommand2);
			PickResult.Pick readPick3 = pickService.getPick(readCommand3);

			List<PickResult.Pick> unclassifiedPickList = pickService.getFolderChildPickList(user.getId(),
				unclassified.getId());
			List<PickResult.Pick> generalPickList = pickService.getFolderChildPickList(user.getId(), general.getId());

			// then
			assertThat(readPick1.parentFolderId()).isNotEqualTo(command.destinationFolderId());
			assertThat(readPick2.parentFolderId()).isEqualTo(command.destinationFolderId());
			assertThat(readPick3.parentFolderId()).isEqualTo(command.destinationFolderId());
			assertThat(unclassifiedPickList).contains(readPick1);
			assertThat(generalPickList).contains(readPick2, readPick3);
		}

		@Test
		@DisplayName("루트로 픽을 이동하는 경우, 실패해야 한다. - 루트는 폴더만 위치할 수 있다.")
		void move_root_pick_test() {
			// given
			LinkInfo linkInfo1 = new LinkInfo("linkUrl1", "linkTitle", "linkDescription", "imageUrl", null);
			List<Long> tagOrder = List.of(tag1.getId(), tag2.getId(), tag3.getId());
			PickCommand.Create command1 = new PickCommand.Create(user.getId(), "PICK", "MEMO", tagOrder,
				unclassified.getId(), linkInfo1);
			pickService.saveNewPick(command1);

			List<Long> movePickIdList = List.of(1L, 2L);

			PickCommand.Move command = new PickCommand.Move(user.getId(), movePickIdList, null, 0);

			// when, then
			assertThatThrownBy(() -> pickService.movePick(command))
				.isInstanceOf(ApiPickException.class)
				.hasMessageStartingWith(ApiPickException.PICK_UNAUTHORIZED_ROOT_ACCESS().getMessage());
		}

		@Test
		@DisplayName("""
			    1. 순서 설정값이 음수가 들어오면 예외를 발생시킨다.
			    2. 순서 설정값이 전체 길이보다 큰 값이 들어오면 예외를 발생시킨다.
			""")
		void move_pick_invalid_order_value_test() {
			// given
			LinkInfo linkInfo1 = new LinkInfo("linkUrl1", "linkTitle", "linkDescription", "imageUrl", null);
			List<Long> tagOrder = List.of(tag1.getId(), tag2.getId(), tag3.getId());
			PickCommand.Create command1 = new PickCommand.Create(user.getId(), "PICK", "MEMO", tagOrder,
				unclassified.getId(), linkInfo1);
			pickService.saveNewPick(command1);

			List<Long> movePickIdList = List.of(-10L, -20000L);

			PickCommand.Move command = new PickCommand.Move(user.getId(), movePickIdList, general.getId(), 0);

			// when, then
			assertThatThrownBy(() -> pickService.movePick(command))
				.isInstanceOf(IndexOutOfBoundsException.class);
		}
	}

	@Nested
	@DisplayName("픽 삭제")
	class deletePick {
		@Test
		@DisplayName("""
			    픽 삭제한 후 조회하여 삭제가 되었음을 확인한다.
			""")
		void remove_and_read_pick_test() {
			// given
			LinkInfo linkInfo1 = new LinkInfo("linkUrl1", "linkTitle", "linkDescription", "imageUrl", null);
			List<Long> tagOrder = List.of(tag1.getId(), tag2.getId(), tag3.getId());
			PickCommand.Create command1 = new PickCommand.Create(user.getId(), "PICK", "MEMO", tagOrder,
				recycleBin.getId(), linkInfo1);
			PickResult.Pick pickResult = pickService.saveNewPick(command1);

			List<Long> deletePickIdList = List.of(pickResult.id());

			// when
			pickService.deletePick(new PickCommand.Delete(user.getId(), deletePickIdList));

			// then
			assertThatThrownBy(() -> pickService.getPick(new PickCommand.Read(user.getId(), pickResult.id())))
				.isInstanceOf(ApiPickException.class)
				.hasMessageStartingWith(ApiPickException.PICK_NOT_FOUND().getMessage());
		}

		@Test
		@DisplayName("""
			    존재하지 않은 픽을 삭제할 순 없으며, 시도시 예외가 발생한다.
			""")
		void remove_not_existing_pick_exception_test() {
			// given
			LinkInfo linkInfo1 = new LinkInfo("linkUrl1", "linkTitle", "linkDescription", "imageUrl", null);
			List<Long> tagOrder = List.of(tag1.getId(), tag2.getId(), tag3.getId());
			PickCommand.Create command1 = new PickCommand.Create(user.getId(), "PICK", "MEMO", tagOrder,
				recycleBin.getId(), linkInfo1);
			PickResult.Pick pickResult = pickService.saveNewPick(command1);

			List<Long> deletePickIdList = List.of(pickResult.id());

			// when
			pickService.deletePick(new PickCommand.Delete(user.getId(), deletePickIdList));

			// then
			assertThatThrownBy(() -> pickService.deletePick(new PickCommand.Delete(user.getId(), deletePickIdList)))
				.isInstanceOf(ApiPickException.class)
				.hasMessageStartingWith(ApiPickException.PICK_NOT_FOUND().getMessage());
		}

		@Test
		@DisplayName("""
			    휴지통에 있지 않은 픽은 삭제할 수 없으며, 시도시 예외가 발생한다.
			""")
		void remove_not_in_recycle_bin_folder_exception_test() {
			// given
			LinkInfo linkInfo1 = new LinkInfo("linkUrl1", "linkTitle", "linkDescription", "imageUrl", null);
			List<Long> tagOrder = List.of(tag1.getId(), tag2.getId(), tag3.getId());
			PickCommand.Create command1 = new PickCommand.Create(user.getId(), "PICK", "MEMO", tagOrder,
				unclassified.getId(), linkInfo1);
			PickResult.Pick pickResult = pickService.saveNewPick(command1);

			List<Long> deletePickIdList = List.of(pickResult.id());

			// when, then
			assertThatThrownBy(() -> pickService.deletePick(new PickCommand.Delete(user.getId(), deletePickIdList)))
				.isInstanceOf(ApiPickException.class)
				.hasMessageStartingWith(ApiPickException.PICK_DELETE_NOT_ALLOWED().getMessage());
		}

		@Test
		@DisplayName("""
			    태그 삭제시, 픽에 설정된 태그 정보와 tagList도 변경되어야 한다.
			""")
		void update_tag_list_in_pick_when_tag_is_removed_test() {
			// given
			TagCommand.Delete delete = new TagCommand.Delete(user.getId(), tag1.getId());

			LinkInfo linkInfo1 = new LinkInfo("linkUrl1", "linkTitle", "linkDescription", "imageUrl", null);
			List<Long> tagOrder = List.of(tag1.getId(), tag2.getId(), tag3.getId());
			PickCommand.Create command1 = new PickCommand.Create(user.getId(), "PICK", "MEMO", tagOrder,
				unclassified.getId(), linkInfo1);
			PickResult.Pick savedPickResult = pickService.saveNewPick(command1);

			// when
			tagService.deleteTag(delete);
			PickResult.Pick pickResult = pickService.getPick(new PickCommand.Read(user.getId(), savedPickResult.id()));
			List<PickTag> pickTagList = pickDataHandler.getPickTagList(pickResult.id());

			// then
			assertThat(pickResult.tagOrderList().size()).isEqualTo(tagOrder.size() - 1);
			assertThat(pickResult.tagOrderList().size()).isEqualTo(pickTagList.size());
			assertThat(pickResult.tagOrderList()).isEqualTo(List.of(tag2.getId(), tag3.getId()));
		}
	}
}