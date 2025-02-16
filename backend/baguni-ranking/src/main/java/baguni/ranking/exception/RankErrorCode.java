package baguni.ranking.exception;

import org.springframework.http.HttpStatus;

import baguni.common.exception.base.ErrorCode;
import baguni.common.exception.level.ErrorLevel;

public class RankErrorCode extends ErrorCode {

	/**
	 * Rank Error Code (R)
	 */
	public static final ErrorCode INVALID_DATE_RANGE = new RankErrorCode(
		"R-000", HttpStatus.NOT_FOUND, "순위 조회 날짜가 잘못되었습니다.", ErrorLevel.SHOULD_NOT_HAPPEN()
	);

	RankErrorCode(String code, HttpStatus status, String message, ErrorLevel errorLevel) {
		super(code, status, message, errorLevel);
	}
}
