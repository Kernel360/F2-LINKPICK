package techpick.core.model.folder;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import techpick.core.model.common.BaseEntity;
import techpick.core.model.user.User;
import techpick.core.util.OrderConverter;

@Table(
	name = "folder",
	uniqueConstraints = {
		@UniqueConstraint(
			name = "UC_FOLDER_NAME_PER_USER",
			columnNames = {"user_id, parent_folder_id, name"}
		)
	}
)
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Folder extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@Column(name = "name", nullable = false)
	private String name;

	@Enumerated(EnumType.STRING)
	@Column(name = "folder_type", nullable = false)
	private FolderType folderType;

	@ManyToOne(fetch = FetchType.LAZY)
	@OnDelete(action = OnDeleteAction.CASCADE) // 부모 폴더가 삭제 되면 자식 폴더 또한 삭제
	@JoinColumn(name = "parent_folder_id")
	private Folder parentFolder;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	// 폴더에 속한 자식 folder id들을 공백으로 분리된 String으로 변환하여 db에 저장
	// ex) [6,3,2,23,1] -> "6 3 2 23 1"
	@Convert(converter = OrderConverter.class)
	@Column(name = "child_folder_order", columnDefinition = "longblob", nullable = false)
	private List<Long> childFolderOrderList = new ArrayList<>();

	// 폴더에 속한 pick id들을 공백으로 분리된 String으로 변환하여 db에 저장
	// ex) [6,3,2,23,1] -> "6 3 2 23 1"
	@Convert(converter = OrderConverter.class)
	@Column(name = "pick_order", columnDefinition = "longblob", nullable = false)
	private List<Long> childPickOrderList = new ArrayList<>();

	public static Folder createEmptyRootFolder(User user) {
		return Folder.builder()
			.folderType(FolderType.ROOT)
			.user(user)
			.name(FolderType.ROOT.getLabel())
			.build();
	}

	public static Folder createEmptyRecycleBinFolder(User user) {
		return Folder.builder()
			.folderType(FolderType.RECYCLE_BIN)
			.user(user)
			.name(FolderType.RECYCLE_BIN.getLabel())
			.build();
	}

	public static Folder createEmptyUnclassifiedFolder(User user) {
		return Folder.builder()
			.folderType(FolderType.UNCLASSIFIED)
			.user(user)
			.name(FolderType.UNCLASSIFIED.getLabel())
			.build();
	}

	public static Folder createEmptyGeneralFolder(User user, Folder parentFolder, String name) {
		return Folder.builder()
			.folderType(FolderType.GENERAL)
			.parentFolder(parentFolder)
			.user(user)
			.name(name)
			.build();
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (!(o instanceof Folder folder)) {
			return false;
		}
		return Objects.equals(id, folder.id);
	}

	@Override
	public int hashCode() {
		return Objects.hashCode(id);
	}

	public void updateFolderName(String name) {
		this.name = name;
	}

	public void updateParentFolder(Folder parentFolder) {
		this.parentFolder = parentFolder;
	}

	public void updateChildFolderOrder(Long pickId, int destination) {
		childFolderOrderList.remove(pickId);
		childFolderOrderList.add(destination, pickId);
	}

	public void updateChildPickOrder(Long pickId, int destination) {
		childPickOrderList.remove(pickId);
		childPickOrderList.add(destination, pickId);
	}

	public void updateChildPickOrderList(List<Long> pickIdList, int destination) {
		childPickOrderList.removeAll(pickIdList);
		childPickOrderList.addAll(destination, pickIdList);
	}

	public void removeChildFolderOrder(Long folderId) {
		this.childFolderOrderList.remove(folderId);
	}

	public void removeChildPickOrder(Long pickId) {
		this.childPickOrderList.remove(pickId);
	}

	@Builder
	private Folder(
		String name,
		FolderType folderType,
		Folder parentFolder,
		User user,
		List<Long> childFolderOrderList,
		List<Long> childPickOrderList
	) {
		this.name = name;
		this.folderType = folderType;
		this.parentFolder = parentFolder;
		this.user = user;
		this.childFolderOrderList = childFolderOrderList != null ? childFolderOrderList : new ArrayList<>();
		this.childPickOrderList = childPickOrderList != null ? childPickOrderList : new ArrayList<>();
	}
}
