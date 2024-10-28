package kernel360.techpick.core.util;

import java.time.Duration;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import kernel360.techpick.core.model.user.Role;
import kernel360.techpick.core.model.user.User;

// 패키지 위치에 대한 고민 필요
@Component
public class JwtUtil {

	@Value("${spring.jwt.issuer}")
	private String issuer;
	@Value("${spring.jwt.secret}")
	private String secret;

	/*
		userId만 토큰에 포함됨
	 */
	public String getToken(User user, Duration expiry) {
		Date now = new Date();
		Date expiryDate = new Date(now.getTime() + expiry.toMillis());

		return Jwts.builder()
			.setHeaderParam(Header.TYPE, Header.JWT_TYPE)
			.setIssuer(issuer)
			.setIssuedAt(now)
			.setExpiration(expiryDate)
			.claim("id", user.getId())
			// TODO: role enum name? value? 변경 필요
			.claim("role", user.getRole())
			.signWith(SignatureAlgorithm.HS256, secret)
			.compact();
	}

	public boolean isValidToken(String token) {
		try {
			Jwts.parser()
				.setSigningKey(secret)
				.parseClaimsJws(token);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	public Role getRole(String token) {
		return Role.valueOf(getClaims(token).get("role", String.class));
	}

	public Long getUserId(String token) {
		return getClaims(token).get("id", Long.class);
	}

	private Claims getClaims(String token) {
		return Jwts.parser()
			.setSigningKey(secret)
			.parseClaimsJws(token)
			.getBody();
	}
}
