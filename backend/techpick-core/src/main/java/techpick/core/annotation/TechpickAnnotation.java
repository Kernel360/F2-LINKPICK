package techpick.core.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import techpick.core.event.events.EventType;

/**
 * 스프링 어노테이션과 우리의 커스텀 어노테이션을 구분하기 쉽게 하고자
 * 아래 클래스에 묶어주었습니다.
 *
 * Class for Custom Annotations
 * - Use with Techpick prefix
 *   ex. @TechpickAnnotation.{SendEvent}
 */
public class TechpickAnnotation {

	/**
	 * @author minkyeu kim
	 * Produce Event to Message Queue
	 */
	@Target(ElementType.METHOD)
	@Retention(RetentionPolicy.RUNTIME)
	public @interface SendEvent {
		/**
		 * (필수값) 이벤트의 행위 정보입니다.
		 * 생성 / 조회 / 삭제 / 수정 중 1가지가 반드시 명시되어야 합니다.
		 */
		EventType type();
	}

	/**
	 * @author suhyeong park
	 * 함수 진입 / 종료 시간을 측정해 로그를 남깁니다.
	 */
	@Target(ElementType.METHOD)
	@Retention(RetentionPolicy.RUNTIME)
	public @interface MeasureTime {
	}

}

