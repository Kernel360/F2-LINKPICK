package baguni.api.fixture;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.Builder;
import lombok.Getter;
import baguni.core.model.folder.Folder;
import baguni.core.model.link.Link;
import baguni.core.model.pick.Pick;
import baguni.core.model.user.User;

@Builder
@Getter
@JsonIgnoreProperties(ignoreUnknown = true)
public class PickFixture {

	private Long id;

	private User user;

	private Link link;

	private Folder parentFolder;

	private String title;

	private List<Long> tagIdOrderedList;

	public Pick get() {
		if (tagIdOrderedList == null) {
			tagIdOrderedList = new ArrayList<>();
		}
		ObjectMapper objectMapper = new ObjectMapper();
		return objectMapper.convertValue(this, Pick.class);
	}
}
