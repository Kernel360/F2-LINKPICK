package techpick.api.domain.sharedFolder.dto;

import java.util.ArrayList;
import java.util.UUID;

import org.springframework.stereotype.Component;

import techpick.core.model.folder.Folder;
import techpick.core.model.link.Link;
import techpick.core.model.pick.Pick;
import techpick.core.model.sharedFolder.SharedFolder;
import techpick.core.model.tag.Tag;

@Component
public class SharedFolderMapper {

	public FolderNode toFolderNode(Folder folder) {
		return FolderNode.builder()
			.folderId(folder.getId())
			.name(folder.getName())
			.folders(new ArrayList<>())
			.picks(new ArrayList<>())
			.createdAt(folder.getCreatedAt().toString())
			.build();
	}

	public PickNode toPickNode(Pick pick) {
		Link link = pick.getLink();
		return PickNode.builder()
			.pickId(pick.getId())
			.title(pick.getTitle())
			.url(link.getUrl())
			.imageUrl(link.getImageUrl())
			.parentFolderId(pick.getParentFolder().getId())
			.tags(new ArrayList<>())
			.createdAt(pick.getCreatedAt().toString())
			.build();
	}

	public TagNode toTagNode(Tag tag) {
		return TagNode.builder()
			.name(tag.getName())
			.colorNumber(tag.getColorNumber())
			.build();
	}

	public SharedFolderResult.Folder toResultFolder(SharedFolder sharedFolder) {
		return SharedFolderResult.Folder.builder()
			.uuid(sharedFolder.getId())
			.jsonData(sharedFolder.getJsonData())
			.build();
	}

	public SharedFolderResult.List toResultList(SharedFolder sharedFolder) {
		return SharedFolderResult.List.builder()
			.uuid(sharedFolder.getId())
			.build();
	}

	public SharedFolderResult.Create toCreateResult(UUID uuid, FolderNode folderNode) {
		return SharedFolderResult.Create.builder().uuid(uuid).folderNode(folderNode).build();
	}
}
