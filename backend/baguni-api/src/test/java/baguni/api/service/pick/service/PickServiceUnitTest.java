package baguni.api.service.pick.service;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import baguni.api.service.ranking.service.RankingService;
import baguni.domain.infrastructure.folder.FolderDataHandler;
import baguni.domain.infrastructure.link.LinkDataHandler;
import baguni.domain.infrastructure.pick.PickDataHandler;
import baguni.domain.infrastructure.pick.dto.PickMapper;
import baguni.domain.infrastructure.tag.TagDataHandler;

@DisplayName("픽 서비스 - 단위 테스트")
@ExtendWith(MockitoExtension.class)
public class PickServiceUnitTest {

	@Mock
	private TagDataHandler tagDataHandler;

	@Mock
	private PickDataHandler pickDataHandler;

	@Mock
	private PickMapper pickMapper;

	@Mock
	private FolderDataHandler folderDataHandler;

	@Mock
	private RankingService rankingService;

	@Mock
	private LinkDataHandler linkDataHandler;

	@InjectMocks
	private PickService pickService;

}
