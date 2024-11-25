package techpick.api.application.sharedFolder.dto;

import org.springframework.stereotype.Component;

import techpick.api.domain.sharedFolder.dto.SharedFolderCommand;

@Component
public class SharedFolderApiMapper {
	public SharedFolderCommand.Create toCreateCommand(Long userId, SharedFolderApiRequest.Create request) {
		return new SharedFolderCommand.Create(userId, request.name(), request.folderIdList());
	}
}
