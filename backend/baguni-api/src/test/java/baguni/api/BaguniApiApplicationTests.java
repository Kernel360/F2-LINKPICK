package baguni.api;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import baguni.BaguniApiApplication;

@SpringBootTest
@ActiveProfiles(profiles = "local")
class BaguniApiApplicationTests {

	@Test
	void contextLoads() {
	}
}