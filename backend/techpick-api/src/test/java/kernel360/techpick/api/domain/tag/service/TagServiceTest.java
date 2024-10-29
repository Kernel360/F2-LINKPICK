package kernel360.techpick.api.domain.tag.service;

import static org.assertj.core.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicInteger;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import kernel360.TechPickApiApplication;
import kernel360.techpick.api.domain.tag.dto.TagCommand;
import kernel360.techpick.api.domain.tag.dto.TagResult;
import kernel360.techpick.api.domain.tag.exception.ApiTagException;
import kernel360.techpick.api.infrastructure.user.UserAdaptor;
import kernel360.techpick.core.model.user.Role;
import kernel360.techpick.core.model.user.SocialType;
import kernel360.techpick.core.model.user.User;
import kernel360.techpick.core.model.user.UserRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@SpringBootTest(classes = TechPickApiApplication.class)
@ActiveProfiles("test")
class TagServiceTest {

	@Autowired
	TagService tagService;

	@Autowired
	UserAdaptor userAdaptor;

	@BeforeAll
	static void setUp(@Autowired UserRepository userRepository) {
		User user = User.builder()
			.email("test@test.com")
			.nickname("test")
			.password("test")
			.role(Role.ROLE_USER)
			.socialProvider(SocialType.KAKAO)
			.socialProviderId("1")
			.tagOrderList(new ArrayList<>())
			.build();
		userRepository.save(user);
	}

	@Test
	@DisplayName("태그 저장 후 태그 상세 조회 테스트")
	@Transactional
	void getTagTest() {
		// given
		TagResult tagCreateResult = getTagCreateResult(0);
		TagCommand.Read command = new TagCommand.Read(1L, tagCreateResult.id());

		// when
		TagResult tagReadResult = tagService.getTag(command);

		// then
		assertThat(tagReadResult).isNotNull();
		assertThat(tagReadResult.name()).isEqualTo(tagCreateResult.name());
		assertThat(tagReadResult.colorNumber()).isEqualTo(tagCreateResult.colorNumber());
	}

	@Test
	@DisplayName("태그 저장 후 태그 리스트 조회 테스트")
	@Transactional
	void getTagListTest() {
		// given
		for (int i = 0; i < 5; i++) {
			getTagCreateResult(i);
		}

		// when
		List<TagResult> tagList = tagService.getUserTagList(1L);

		// then
		assertThat(tagList).isNotNull();
		assertThat(tagList.size()).isEqualTo(5);
	}

	@Test
	@DisplayName("태그 중복 저장 테스트")
	@Transactional
	void duplicateTagTest() {
		// given
		getTagCreateResult(0);

		// when, then
		assertThatThrownBy(() -> getTagCreateResult(0))
			.isInstanceOf(ApiTagException.class)
			.hasMessageStartingWith(ApiTagException.TAG_ALREADY_EXIST().getMessage());
	}

	@Test
	@DisplayName("태그 수정 테스트")
	@Transactional
	void updateTagTest() {
		// given
		TagResult tagCreateResult = getTagCreateResult(0);
		TagCommand.Update update = new TagCommand.Update(1L, tagCreateResult.id(), "태그태그", 2);

		// when
		TagResult tagUpdateResult = tagService.updateTag(update);

		// then
		assertThat(tagUpdateResult).isNotNull();
		assertThat(tagUpdateResult.name()).isEqualTo("태그태그");
		assertThat(tagUpdateResult.colorNumber()).isEqualTo(2);
	}

	@Test
	@DisplayName("태그 이동 테스트")
	@Transactional
	void moveTagTest() {
		// given
		List<Long> tagIdList = new ArrayList<>();
		List<Long> expectedOrderList = new ArrayList<>();
		for (int i = 0; i < 5; i++) {
			TagResult tagResult = getTagCreateResult(i);
			tagIdList.add(tagResult.id());
			expectedOrderList.add(tagResult.id());
		}

		User user = userAdaptor.getUser(1L);
		user.updateTagOrderList(tagIdList);

		Long targetId = expectedOrderList.get(0);
		int targetIdx = 3;
		expectedOrderList.remove(0);
		expectedOrderList.add(targetIdx, targetId);

		TagCommand.Move move = new TagCommand.Move(1L, targetId, targetIdx);

		// when
		tagService.moveUserTag(move);

		// then
		assertThat(user.getTagOrderList().size()).isEqualTo(5);
		assertThat(user.getTagOrderList()).isEqualTo(expectedOrderList);
	}

	// TODO: orderIdx 음수인 경우 테스트 필요
	@Test
	@DisplayName("태그 이동 시 Index 음수인 경우 테스트")
	void moveTagNegativeIndexTest() {
	}

	@Test
	@DisplayName("태그 삭제 테스트")
	@Transactional
	void deleteTagTest() {
		// given
		TagResult tagCreateResult = getTagCreateResult(0);
		TagCommand.Delete delete = new TagCommand.Delete(1L, tagCreateResult.id());
		TagCommand.Read read = new TagCommand.Read(1L, tagCreateResult.id());

		// when
		tagService.deleteTag(delete);

		// then
		assertThatThrownBy(() -> tagService.getTag(read))
			.isInstanceOf(ApiTagException.class)
			.hasMessageStartingWith(ApiTagException.TAG_NOT_FOUND().getMessage());
	}

	@Test
	@DisplayName("태그 저장 동시성 테스트")
	@Transactional
	void createTagConcurrencyTest() throws InterruptedException {
		// given
		int threadCount = 20;
		ExecutorService executorService = Executors.newFixedThreadPool(threadCount);
		CountDownLatch countDownLatch = new CountDownLatch(threadCount);

		AtomicInteger successCount = new AtomicInteger();
		AtomicInteger failCount = new AtomicInteger();
		// when

		for (int i = 0; i < threadCount; i++) {
			executorService.submit(() -> {
				try {
					TagCommand.Create command = new TagCommand.Create(1L, "태그12341", 2);
					tagService.saveTag(command);
					successCount.incrementAndGet(); // 성공 카운트
				} catch (Exception e) {
					log.info(e.getMessage());
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

	private TagResult getTagCreateResult(int n) {
		TagCommand.Create create = new TagCommand.Create(1L, "태그" + n, 1);
		return tagService.saveTag(create);
	}

}