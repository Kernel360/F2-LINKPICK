package techpick.ranking;

import java.time.LocalDate;

import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;
import lombok.Getter;

@Document(collection = "link_view_count")
@Getter
public class LinkViewCount {

    @Id
    private String id;

    private final LocalDate date;

    private final String url;

    private Long count;

    public LinkViewCount(LocalDate date, String url, Long count) {
        this.date = date;
        this.url = url;
        this.count = count;
    }

    public LinkViewCount incrementCount() {
        ++this.count;
        return this;
    }
}
