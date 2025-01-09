package techpick;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(
	scanBasePackages = {"techpick.api", "techpick.core", "techpick.security"}
)

// 테스트를 위한 주석 - 제거 예정
public class TechPickApiApplication {
	public static void main(String[] args) {
		SpringApplication.run(TechPickApiApplication.class, args);
	}
}