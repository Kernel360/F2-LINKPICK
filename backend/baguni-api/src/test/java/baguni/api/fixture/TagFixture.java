package baguni.api.fixture;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.ObjectMapper;

import baguni.domain.model.sharedFolder.SharedFolder;
import baguni.domain.model.tag.Tag;
import baguni.domain.model.user.User;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@JsonIgnoreProperties(ignoreUnknown = true)
public class TagFixture {

	private Long id;

	private String name;

	private Integer colorNumber;

	private User user;

	public Tag get() {
		ObjectMapper objectMapper = new ObjectMapper();
		return objectMapper.convertValue(this, Tag.class);
	}
}
