package baguni.domain.model.util;

import java.util.UUID;

/**
 * VO for ID Token
 */
public class IDToken {

	private final UUID uuid;

	public static IDToken fromString(String raw) throws IdTokenConversionException {
		try {
			var uuid = UUID.fromString(raw);
			return new IDToken(uuid);
		} catch (Exception e) {
			throw new IdTokenConversionException("ID 토큰의 값이 UUID 가 아닙니다!");
		}
	}

	public static IDToken makeNew() {
		return new IDToken(UUID.randomUUID());
	}

	@Override
	public String toString() {
		return this.uuid.toString();
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (!(o instanceof IDToken token)) {
			return false;
		}
		return this.uuid.compareTo(token.uuid) == 0;
	}

	private IDToken(UUID uuid) {
		this.uuid = uuid;
	}
}
