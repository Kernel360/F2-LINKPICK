package baguni.entity.model.util;

import java.util.UUID;

/**
 * VO for ID Token
 */
public class IDToken {

	private final UUID raw;

	public static IDToken fromString(String raw) {
		return new IDToken(UUID.fromString(raw));
	}

	public static IDToken makeNew() {
		return new IDToken(UUID.randomUUID());
	}

	@Override
	public String toString() {
		return this.raw.toString();
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (!(o instanceof IDToken token)) {
			return false;
		}
		return this.raw.compareTo(token.raw) == 0;
	}

	private IDToken(UUID raw) {
		this.raw = raw;
	}
}
