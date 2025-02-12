package baguni.api.application.user.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import baguni.api.application.user.controller.dto.UserApiMapper;
import baguni.api.application.user.controller.dto.UserInfoApiResponse;
import baguni.api.service.user.service.UserService;
import baguni.security.annotation.LoginUserId;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Tag(name = "유저 API", description = "사용자 관련 API")
public class UserApiController {

	private final UserService userService;
	private final UserApiMapper userApiMapper;

	@GetMapping
	@Operation(summary = "로그인 회원의 정보 획득", description = "회원 식별자(ID_TOKEN) 및 이메일 등의 비민감성 정보를 획득합니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "회원 정보 획득 성공")
	})
	public ResponseEntity<UserInfoApiResponse> getUserInfo(
		@LoginUserId Long userId
	) {
		var userInfo = userService.getUserInfoById(userId);
		var response = userApiMapper.toApiResponse(userInfo);
		return ResponseEntity.ok(response);
	}
}