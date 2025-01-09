package techpick.api.domain.chromebookmark.dto;

import java.util.List;

/**
 * chrome bookmark import 결과에 대한 dto
 * */
public record ChromeImportResult(List<String> ogTagUpdateUrls, List<String> alreadyExistBookmarks) {
}
