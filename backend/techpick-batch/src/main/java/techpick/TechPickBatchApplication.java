package techpick;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(
	scanBasePackages = {"techpick.batch", "techpick.core"}
)
public class TechPickBatchApplication {
	public static void main(String[] args) {
		SpringApplication.run(TechPickBatchApplication.class, args);
	}
}