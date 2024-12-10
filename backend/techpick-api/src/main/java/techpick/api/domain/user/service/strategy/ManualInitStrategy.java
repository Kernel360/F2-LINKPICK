package techpick.api.domain.user.service.strategy;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import techpick.api.domain.link.service.LinkService;
import techpick.api.domain.pick.dto.PickCommand;
import techpick.api.domain.pick.service.PickService;
import techpick.core.model.folder.Folder;
import techpick.core.model.user.User;

@Slf4j
@Component
@Qualifier("app-manual")
@RequiredArgsConstructor
public class ManualInitStrategy implements ContentInitStrategy {

	private final PickService pickService;
	private final LinkService linkService;

	private final List<String> MANUAL_URLS = List.of(
		"https://positive-airboat-4de.notion.site/15841a7fba6580c59591e2d5d1c2414b?pvs=4",
		"https://positive-airboat-4de.notion.site/15841a7fba65808b8636e15e6c6d9679?pvs=4",
		"https://positive-airboat-4de.notion.site/15841a7fba65809d89a6dceb89060f70?pvs=4",
		"https://positive-airboat-4de.notion.site/15841a7fba6580f78caee50c069a1247?pvs=4"
	);

	@Override
	public void initContent(User user, Folder parentFolder) {
		for (var url : MANUAL_URLS) {
			var linkInfo = linkService.saveLinkAndUpdateOgTag(url);
			var command = new PickCommand.Create(
				user.getId(), linkInfo.title(), new ArrayList<>(), parentFolder.getId(), linkInfo
			);
			pickService.saveNewPick(command);
		}
	}
}
