package kernel360;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(
	scanBasePackages = {"kernel360.techpick.batch", "kernel360.techpick.core"}
)
public class TechPickBatchApplication {
	public static void main(String[] args) {
		SpringApplication.run(TechPickBatchApplication.class, args);
	}
}