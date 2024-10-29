package kernel360.techpick.api.domain.pick.service;

import java.util.List;

import kernel360.techpick.api.domain.pick.dto.PickCommand;
import kernel360.techpick.api.domain.pick.dto.PickResult;

public interface PickService {

	PickResult getPick(PickCommand.Read command);

	PickResult getPickUrl(Long userId, String url);

	PickResult saveNewPick(PickCommand.Create command);

	PickResult updatePick(PickCommand.Update command);

	List<Long> movePick(PickCommand.Move command);

	void deletePick(PickCommand.Delete command);
}
