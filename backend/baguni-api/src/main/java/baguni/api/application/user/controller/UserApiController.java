package baguni.api.application.user.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import baguni.security.service.UserService;
import baguni.security.annotation.LoginUserId;
import baguni.security.handler.BaguniLogoutHandler;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Tag(name = "User API", description = "유저 API")
public class UserApiController {

	private final UserService userService;
	private final BaguniLogoutHandler logoutHandler;

	@DeleteMapping
	@Operation(summary = "회원 탈퇴", description = "회원 탈퇴를 하면 모든 폴더, 픽, 태그가 삭제됩니다.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "204", description = "회원 탈퇴 성공")
	})
	public ResponseEntity<Void> deleteUser(@LoginUserId Long userId, HttpServletRequest request,
		HttpServletResponse response) {
		userService.deleteUser(userId);
		logoutHandler.clearCookies(request, response);
		return ResponseEntity.noContent().build();
	}
}