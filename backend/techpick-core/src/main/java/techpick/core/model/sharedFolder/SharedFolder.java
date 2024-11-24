package techpick.core.model.sharedFolder;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import techpick.core.model.user.User;

@Table(name = "sharedFolder")
@Entity
@Getter
@NoArgsConstructor
public class SharedFolder {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;

	@Column(columnDefinition = "json", nullable = false)
	private String jsonData;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	// 공유폴더의 생성 시간이 jsonData 에도 포함되어야해서 생성자로 주입 받는 방식으로 사용
	@Column
	private LocalDateTime createdAt;

	private SharedFolder(User user, String jsonData, LocalDateTime createdAt) {
		this.user = user;
		this.jsonData = jsonData;
		this.createdAt = createdAt;
	}

	public static SharedFolder createSharedFolder(User user, String jsonData, LocalDateTime createdAt) {
		return new SharedFolder(user, jsonData, createdAt);
	}
}
