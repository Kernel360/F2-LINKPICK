package baguni.api.application.folder.controller;

public class FolderApiConstant {

	public static final String ROOT_FOLDER_EXAMPLE = """
		[
		    {
		        "id": 1,
		        "name": "Root Folder",
		        "folderType": "ROOT",
		        "parentFolderId": null,
		        "childFolderIdOrderedList": [4]
		        "createdAt": 2007-12-03T10:15:3
		        "updatedAt": 2007-12-03T10:15:3
		        "folderAccessToken": null
		    },
		    {
		        "id": 4,
		        "name": "프론트엔드 자료 모음",
		        "folderType": "GENERAL",
		        "parentFolderId": 1,
		        "childFolderIdOrderedList": []
		        "createdAt": 2007-12-03T10:15:3
		        "updatedAt": 2007-12-03T10:15:3
		        "folderAccessToken": 9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d
		    }
		]
		""";

}
