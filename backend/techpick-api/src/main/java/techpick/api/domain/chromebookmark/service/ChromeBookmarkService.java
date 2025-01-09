package techpick.api.domain.chromebookmark.service;

import java.util.ArrayList;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import techpick.api.domain.chromebookmark.dto.ChromeBookmark;
import techpick.api.domain.chromebookmark.dto.ChromeFolder;
import techpick.api.domain.chromebookmark.dto.ChromeImportResult;
import techpick.api.domain.chromebookmark.dto.ChromeMapper;
import techpick.api.domain.folder.dto.FolderCommand;
import techpick.api.domain.folder.exception.ApiFolderException;
import techpick.api.infrastructure.folder.FolderDataHandler;
import techpick.api.infrastructure.link.LinkDataHandler;
import techpick.api.infrastructure.pick.PickDataHandler;
import techpick.core.model.folder.Folder;
import techpick.core.model.link.Link;
import techpick.core.model.pick.Pick;

/**
 * 폴더 Import와 Export를 담당하는 서비스
 * 크롬브라우저에 import 가능한 형식으로 저장한 폴더들과 픽들을 export
 * 크롬브라우저에서 export한 html을 Techpick에 import
 * */
@Service
@RequiredArgsConstructor
@Slf4j
public class ChromeBookmarkService {

	private final FolderDataHandler folderDataHandler;
	private final PickDataHandler pickDataHandler;
	private final LinkDataHandler linkDataHandler;
	private final ChromeMapper mapper;

	@Transactional(readOnly = true)
	public String exportFolder(FolderCommand.Export command) {
		StringBuilder sb = new StringBuilder();
		Folder folder = folderDataHandler.getFolder(command.folderId());
		validateFolderAccess(command.userId(), folder);

		return searchExportData(new StringBuilder(), folder).toString();
	}

	@Transactional(readOnly = true)
	public String exportUserFolder(Long userId) {
		StringBuilder sb = new StringBuilder();
		searchExportData(sb, folderDataHandler.getUnclassifiedFolder(userId));
		searchExportData(sb, folderDataHandler.getRootFolder(userId));
		searchExportData(sb, folderDataHandler.getRecycleBin(userId));
		return sb.toString();
	}

	@Transactional
	public ChromeImportResult importChromeBookmarks(Long userId, String html) throws InterruptedException {
		List<String> ogTagUpdateUrls = new ArrayList<>();
		List<String> alreadyExistBookmarks = new ArrayList<>();

		Element element = Jsoup.parse(html).selectFirst("DL").selectFirst("DT");
		ChromeFolder folder = new ChromeFolder(element.selectFirst("H3").text());
		parseHTML(element.selectFirst("DL"), folder);

		Folder rootFolder = folderDataHandler.getRootFolder(userId);
		searchImportData(userId, folder, rootFolder, alreadyExistBookmarks, ogTagUpdateUrls);

		return new ChromeImportResult(ogTagUpdateUrls, alreadyExistBookmarks);
	}

	private void validateFolderAccess(Long userId, Folder folder) {
		if (!folder.getUser().getId().equals(userId)) {
			throw ApiFolderException.FOLDER_ACCESS_DENIED();
		}
	}

	private StringBuilder searchExportData(StringBuilder sb, Folder folder) {
		sb.append("<DT>").append("<H3>").append(folder.getName()).append("</H3>\n");
		sb.append("<DL>\n");
		List<Folder> childFolderList = folderDataHandler.getFolderListPreservingOrder(
			folder.getChildFolderIdOrderedList());
		// 자식폴더를 순회하며 추가
		for (Folder childFolder : childFolderList) {
			searchExportData(sb, childFolder);
		}
		// 자식픽들을 순회하며 추가
		List<Pick> childPickList = pickDataHandler.getPickListPreservingOrder(folder.getChildPickIdOrderedList());
		for (Pick pick : childPickList) {
			sb.append("<DT>")
				.append("<A HREF=\"")
				.append(pick.getLink().getUrl())
				.append("\">")
				.append(pick.getTitle())
				.append("</A>\n");
		}
		sb.append("</DL>\n");
		return sb;
	}

	private void searchImportData(Long userId, ChromeFolder chromeFolder, Folder parentFolder,
		List<String> alreadyExistBookmarks,
		List<String> ogTagUpdateUrls) {
		Folder folder = folderDataHandler.saveFolder(
			mapper.toFolderCreateCommand(userId, parentFolder.getId(), chromeFolder));
		for (ChromeBookmark bookmark : chromeFolder.getChildBookmarkList()) {
			if (!linkDataHandler.existsByUrl(bookmark.getUrl())) {
				// 링크가 존재하지 않으면 url만 있는 링크를 저장하고 이후 og tag 업데이트를 위해 list에 기록
				linkDataHandler.saveLink(Link.createLinkByUrl(bookmark.getUrl()));
				ogTagUpdateUrls.add(bookmark.getUrl());
			}
			Link link = linkDataHandler.getLink(bookmark.getUrl());
			if (pickDataHandler.existsByUserIdAndLink(userId, link)) {
				alreadyExistBookmarks.add(bookmark.getUrl());
				continue;
			}
			pickDataHandler.savePick(mapper.toPickCreateCommand(userId, folder.getId(), bookmark));
		}
		for (ChromeFolder childFolder : chromeFolder.getChildFolderList()) {
			// n-depth 로 저장
			// searchImportData(userId, childFolder, folder, alreadyExistBookmarks, ogTagUpdateUrls);
			// 1-depth 로 저장
			searchImportData(userId, childFolder, parentFolder, alreadyExistBookmarks, ogTagUpdateUrls);
		}
		// 자식폴더 전부 순회했는데, 빈 폴더이면 삭제
		if (folder.getChildPickIdOrderedList().isEmpty() && folder.getChildFolderIdOrderedList().isEmpty()) {
			folderDataHandler.deleteFolderList(new FolderCommand.Delete(userId, List.of(folder.getId())));
		}
	}

	private void parseHTML(Element element, ChromeFolder parentFolder) {
		if (element == null) {
			return;
		}
		/*
			폴더의 경우 다음과 같은 형태
			<DT><H3>"폴더 이름"</H3>
			<DL>
				...
			</DL>

			북마크의 경우 다음과 같은 형태
			<DT><A HREF="url">"북마크 이름"</A>

			그러므로 <DT> 태그 다음 등장하는 <H3>, <A> 태그로 폴더,북마크를 판단
			폴더인 경우 <DT>태그 다음줄의 <DL> 태그를 파싱하여 재귀적으로 탐색
		*/
		for (Element dt : element.select("DT")) {
			if (!dt.parent().equals(element)) {
				continue;
			}
			Element child;
			if ((child = dt.selectFirst("H3")) != null) {
				ChromeFolder childFolder = new ChromeFolder(child.text());
				parentFolder.getChildFolderList().add(childFolder);
				parseHTML(dt.selectFirst("DL"), childFolder);
			} else if ((child = dt.selectFirst("DT")) != null) {
				String url = child.selectFirst("A").attr("HREF");
				ChromeBookmark bookmark = new ChromeBookmark(child.text(), url);
				parentFolder.getChildBookmarkList().add(bookmark);
			}
		}
	}

}
