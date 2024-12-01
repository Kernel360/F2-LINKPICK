package techpick.ranking.entity;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Document(collection = "pick")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PickPick {

    @Id
    private String id;

    private String url;

    private String title;

    private Long parentFolderId;

    private List<Long> tagIdOrderedList;

    @Builder
    private PickPick(String url, String title, Long parentFolderId, List<Long> tagIdOrderedList) {
        this.url = url;
        this.title = title;
        this.parentFolderId = parentFolderId;
        this.tagIdOrderedList = tagIdOrderedList;
    }
}
