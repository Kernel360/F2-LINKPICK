package techpick.ranking.infra.sharedFolder;

import java.time.LocalDate;

import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;
import lombok.Getter;
import techpick.ranking.infra.pick.UrlCount;

/**
 * 공유된 폴더에서 해당 링크가 조회된 횟수를 날짜별로 집계합니다.
 */
@Document(collection = "shared_folder_link_view_count")
@Getter
public class SharedFolderPickViewCount extends UrlCount {

	@Id
	private String id;

	private final String folderAccessToken;

	public SharedFolderPickViewCount(LocalDate date, String url, String folderAccessToken) {
		super(date, url);
		this.folderAccessToken = folderAccessToken;
	}
}
