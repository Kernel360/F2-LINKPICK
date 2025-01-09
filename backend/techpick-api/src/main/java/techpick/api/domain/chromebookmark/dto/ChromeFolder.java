package techpick.api.domain.chromebookmark.dto;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;

@Getter
public class ChromeFolder {
	private final String name;
	private final List<ChromeFolder> childFolderList;
	private final List<ChromeBookmark> childBookmarkList;

	public ChromeFolder(String name) {
		this.name = name;
		this.childFolderList = new ArrayList<>();
		this.childBookmarkList = new ArrayList<>();
	}
}
