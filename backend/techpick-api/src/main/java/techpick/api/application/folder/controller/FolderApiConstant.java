package techpick.api.application.folder.controller;

public class FolderApiConstant {

	public static final String ROOT_FOLDER_EXAMPLE = """
		[
		    {
		        "id": 1,
		        "name": "Root Folder",
		        "folderType": "ROOT",
		        "parentFolderId": null,
		        "childFolderIdOrderedList": [4]
		    },
		    {
		        "id": 4,
		        "name": "General Folder",
		        "folderType": "GENERAL",
		        "parentFolderId": 1,
		        "childFolderIdOrderedList": []
		    }
		]
		""";

}
