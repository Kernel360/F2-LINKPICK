package techpick;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Exclude Hibernate Jpa module
 */
@SpringBootApplication
public class TechPickRankingApplication {

    public static void main(String[] args) {
        SpringApplication.run(TechPickRankingApplication.class, args);
    }
}