package baguni.domain.service.user.util;

public class SimpleNameGenerator implements NameGenerator {
	@Override
	public String generateName() {
		return "RANDOM_NICKNAME";
	}
}
