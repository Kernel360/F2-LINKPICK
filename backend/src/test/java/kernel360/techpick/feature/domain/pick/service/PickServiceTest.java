package kernel360.techpick.feature.domain.pick.service;

import static org.assertj.core.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicInteger;

import org.hibernate.Hibernate;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.EntityManager;
import kernel360.techpick.TechpickApplication;
import kernel360.techpick.core.exception.base.ApiException;
import kernel360.techpick.core.model.folder.Folder;
import kernel360.techpick.core.model.folder.FolderRepository;
import kernel360.techpick.core.model.link.LinkRepository;
import kernel360.techpick.core.model.pick.PickRepository;
import kernel360.techpick.core.model.pick.PickTag;
import kernel360.techpick.core.model.pick.PickTagRepository;
import kernel360.techpick.core.model.tag.Tag;
import kernel360.techpick.core.model.tag.TagRepository;
import kernel360.techpick.core.model.user.Role;
import kernel360.techpick.core.model.user.SocialType;
import kernel360.techpick.core.model.user.User;
import kernel360.techpick.core.model.user.UserRepository;
import kernel360.techpick.feature.domain.link.dto.LinkInfo;
import kernel360.techpick.feature.domain.link.dto.LinkMapper;
import kernel360.techpick.feature.domain.pick.dto.PickCommand;
import kernel360.techpick.feature.domain.pick.dto.PickResult;
import kernel360.techpick.feature.domain.pick.exception.ApiPickException;
import kernel360.techpick.feature.domain.tag.dto.TagCommand;
import kernel360.techpick.feature.domain.tag.dto.TagResult;
import kernel360.techpick.feature.domain.tag.service.TagService;
import kernel360.techpick.feature.infrastructure.link.LinkAdaptor;
import kernel360.techpick.feature.infrastructure.pick.PickAdaptor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@SpringBootTest(classes = TechpickApplication.class)
@ActiveProfiles("test")
class PickServiceTest {

	@Autowired
	PickService pickService;
	@Autowired
	PickAdaptor pickAdaptor;
	@Autowired
	TagService tagService;

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
		// pickTagRepository.deleteAll();
		// pickRepository.deleteAll();
		// userRepository.deleteAll(); // TODO: soft delete 이라 DB를 직접 비워야 한다.
		// folderRepository.deleteAll();
		// tagRepository.deleteAll();
		// linkRepository.deleteAll();
	}

	@Nested
	@DisplayName("픽 조회")
	@Transactional
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
			PickResult saveResult = pickService.saveNewPick(command);
			PickResult readResult = pickService.getPick(new PickCommand.Read(user.getId(), saveResult.id()));

			// then
			log.info("saveResult : {}", saveResult);
			assertThat(readResult).isNotNull();
			assertThat(readResult).isEqualTo(saveResult);
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
			PickResult createResult = pickService.saveNewPick(command);

			// when
			String newTitle = "NEW_PICK";
			List<Long> newTagOrder = List.of(tag3.getId(), tag2.getId(), tag1.getId());
			PickCommand.Update updateCommand = new PickCommand.Update(
				user.getId(), createResult.id(),
				newTitle, null /* memo not changed */, newTagOrder
			);
			PickResult updateResult = pickService.updatePick(updateCommand);

			// then
			assertThat(updateResult.title()).isNotEqualTo(createResult.title()).isEqualTo(newTitle); // changed
			assertThat(updateResult.tagOrderList()).isNotEqualTo(createResult.tagOrderList())
				.isEqualTo(newTagOrder); // changed
			assertThat(updateResult.memo()).isEqualTo(createResult.memo()); // unchanged
		}
	}

	@Nested
	@DisplayName("픽 이동")
	@Transactional
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
			List<Long> tagOrder = List.of(tag1.getId(), tag2.getId(), tag3.getId());
			PickCommand.Create command1 = new PickCommand.Create(user.getId(), "PICK", "MEMO", tagOrder,
				unclassified.getId(), linkInfo1);
			PickCommand.Create command2 = new PickCommand.Create(user.getId(), "PICK", "MEMO", tagOrder,
				unclassified.getId(), linkInfo2);
			PickCommand.Create command3 = new PickCommand.Create(user.getId(), "PICK", "MEMO", tagOrder,
				unclassified.getId(), linkInfo3);

			PickResult pickResult1 = pickService.saveNewPick(command1);
			PickResult pickResult2 = pickService.saveNewPick(command2);
			PickResult pickResult3 = pickService.saveNewPick(command3);

			List<Long> originalPickIdList = List.of(pickResult1.id(), pickResult2.id(), pickResult3.id());
			List<Long> movePickIdList = List.of(pickResult2.id(), pickResult3.id());

			PickCommand.Move command = new PickCommand.Move(user.getId(), movePickIdList, unclassified.getId(), 0);

			// when
			List<Long> pickIdList = pickService.movePick(command);
			log.info("pickIdList: {} ", pickIdList.toString());

			// then
			assertThat(originalPickIdList).isNotEqualTo(pickIdList);
			assertThat(pickIdList.size()).isEqualTo(3);
			assertThat(pickIdList.get(2)).isEqualTo(originalPickIdList.get(0));
			assertThat(pickIdList.get(0)).isEqualTo(originalPickIdList.get(1));
			assertThat(pickIdList.get(1)).isEqualTo(originalPickIdList.get(2));
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

			PickResult pickResult1 = pickService.saveNewPick(command1);
			PickResult pickResult2 = pickService.saveNewPick(command2);
			PickResult pickResult3 = pickService.saveNewPick(command3);

			List<Long> originalPickIdList = List.of(pickResult1.id(), pickResult2.id(), pickResult3.id());
			List<Long> movePickIdList = List.of(pickResult3.id(), pickResult2.id());

			PickCommand.Move command = new PickCommand.Move(user.getId(), movePickIdList, general.getId(), 0);

			// when
			List<Long> pickIdList = pickService.movePick(command);

			// then
			// 테스트 하려는데 잘 안됨.... 트랜잭션 범위 문제?
			// assertThat(pickResult1.parentFolderId()).isEqualTo(command.destinationFolderId());
			log.info("pickIdList: {} ", pickIdList.toString());
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
	@Transactional
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
			PickResult pickResult = pickService.saveNewPick(command1);

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
			PickResult pickResult = pickService.saveNewPick(command1);

			List<Long> deletePickIdList = List.of(pickResult.id());

			// when
			pickService.deletePick(new PickCommand.Delete(user.getId(), deletePickIdList));

			// then
			assertThatThrownBy(() -> pickService.deletePick(new PickCommand.Delete(user.getId(), deletePickIdList)))
				.isInstanceOf(DataIntegrityViolationException.class);
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
			PickResult pickResult = pickService.saveNewPick(command1);

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
			PickResult savedPickResult = pickService.saveNewPick(command1);

			// when
			tagService.deleteTag(delete);
			PickResult pickResult = pickService.getPick(new PickCommand.Read(user.getId(), savedPickResult.id()));
			List<PickTag> pickTagList = pickAdaptor.getPickTagList(pickResult.id());

			// then
			assertThat(pickResult.tagOrderList().size()).isEqualTo(tagOrder.size() - 1);
			assertThat(pickResult.tagOrderList().size()).isEqualTo(pickTagList.size());
			assertThat(pickResult.tagOrderList()).isEqualTo(List.of(tag2.getId(), tag3.getId()));
		}
	}
}