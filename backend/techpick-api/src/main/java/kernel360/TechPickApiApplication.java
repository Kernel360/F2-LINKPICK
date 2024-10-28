package kernel360;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(
	scanBasePackages = {"kernel360.techpick.api", "kernel360.techpick.core"}
)
public class TechPickApiApplication {
	public static void main(String[] args) {
		SpringApplication.run(TechPickApiApplication.class, args);
	}
}