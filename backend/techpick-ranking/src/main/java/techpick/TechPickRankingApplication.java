package techpick;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;

@SpringBootApplication(
    scanBasePackages = {"techpick.core"}
)
public class TechPickRankingApplication {

    public static void main(String[] args) {
        SpringApplication.run(TechPickRankingApplication.class, args);
    }
}