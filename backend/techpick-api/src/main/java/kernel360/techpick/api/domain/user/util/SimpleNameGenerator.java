package kernel360.techpick.api.domain.user.util;

public class SimpleNameGenerator implements NameGenerator {
	@Override
	public String generateName() {
		return "RANDOM_NICKNAME";
	}
}
