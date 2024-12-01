package techpick.core.rabbitmq;

/**
 * @author minkyeu kim
 * 이벤트가 생성인지, 조회인지 등을 판단하기 위한 ENUM.
 * PRODUCER 쪽에서 명시적으로 해당 이벤트의 성격을 설정해야 합니다.
 * `SendEvent`
 */
public enum EventType {
    CREATE,
    READ,
    UPDATE,
    DELETE,
}