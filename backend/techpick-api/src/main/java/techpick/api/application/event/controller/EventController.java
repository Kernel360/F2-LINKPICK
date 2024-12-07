package techpick.api.application.event.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import techpick.core.event.EventMessenger;
import techpick.core.event.events.PickCreateEvent;
import techpick.core.event.events.PickViewEvent;
import techpick.core.event.events.SharedFolderLinkViewEvent;
import techpick.security.annotation.LoginUserId;

@RestController
@Tag(name = "이벤트 수집 API", description = "발생하는 이벤트를 이곳으로 보내줘야 집계에 반영됩니다.")
@RequiredArgsConstructor
@RequestMapping("/api/event")
public class EventController {

	private final EventMessenger eventMessenger;

	/**
	 * @author minkyeu kim
	 * [사용자 인증 정보가 필요한 api]
	 * 내가 나의 북마크를 클릭했을 때 프론트엔드가 보내는 이벤트
	 */
	@PostMapping("/pick/create")
	@SecurityRequirement(name = "access-token")
	@Operation(
		summary = "사용자의 북마크 생성 이벤트 수집",
		description = "[로그인 필요] 서버에게 사용자 자신의 북마크 생성을 알립니다."
	)
	public ResponseEntity<Void> bookmarkCreate(
		@Parameter(description = "생성된 북마크의 대상 링크 url") @RequestParam String url,
		@LoginUserId Long userId
	) {
		eventMessenger.send(new PickCreateEvent(userId, url));
		return ResponseEntity.ok().build();
	}

	/**
	 * @author minkyeu kim
	 * [사용자 인증 정보가 필요한 api]
	 * 내가 나의 북마크를 클릭했을 때 프론트엔드가 보내는 이벤트
	 */
	@PostMapping("/pick/view")
	@Operation(
		summary = "사용자 자신의 북마크 조회 이벤트 수집",
		description = "[로그인 필요] 서버에게 사용자 자신의 북마크 조회를 알립니다."
	)
	public ResponseEntity<Void> bookmarkView(
		@Parameter(description = "조회되는 북마크의 링크 url") @RequestParam String url,
		@LoginUserId Long userId
	) {
		eventMessenger.send(new PickViewEvent(userId, url));
		return ResponseEntity.ok().build();
	}

	/**
	 * @author minkyeu kim
	 * [공개 api]
	 * 공유된 폴더에서 링크를 클릭했을 때 프론트엔드가 보내는 이벤트
	 */
	@PostMapping("/shared/read")
	@Operation(
		summary = "공개 폴더의 북마크 조회 이벤트 수집",
		description = "서버에게 공개 폴더의 어떤 북마크가 조회됬는지 알립니다."
	)
	public ResponseEntity<Void> sharedFolderLinkView(
		@Parameter(description = "조회된 링크 url") @RequestParam String url,
		@Parameter(description = "조회된 공개 폴더 접근용 토큰") @RequestParam String folderAccessToken
	) {
		eventMessenger.send(new SharedFolderLinkViewEvent(url, folderAccessToken));
		return ResponseEntity.ok().build();
	}
}
