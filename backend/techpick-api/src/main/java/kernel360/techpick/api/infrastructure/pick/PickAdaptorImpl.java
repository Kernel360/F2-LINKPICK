package kernel360.techpick.api.infrastructure.pick;

import org.apache.commons.lang3.ObjectUtils;
import org.springframework.stereotype.Component;

import kernel360.techpick.core.model.pick.Pick;
import kernel360.techpick.core.model.pick.PickRepository;
import kernel360.techpick.core.model.pick.PickTag;
import kernel360.techpick.core.model.pick.PickTagRepository;
import kernel360.techpick.core.model.tag.Tag;
import kernel360.techpick.core.model.tag.TagRepository;
import kernel360.techpick.core.model.user.User;
import kernel360.techpick.api.domain.pick.exception.ApiPickException;
import kernel360.techpick.api.domain.tag.exception.ApiTagException;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class PickAdaptorImpl implements PickAdaptor {
	private final PickRepository pickRepository;
	private final PickTagRepository pickTagRepository;
	private final TagRepository tagRepository;

	@Override
	public Pick getPick(User user, Long pickId) {
		Pick pick = pickRepository.findById(pickId).orElseThrow(ApiPickException::PICK_NOT_FOUND);
		if (ObjectUtils.notEqual(user, pick.getUser())) {
			throw ApiPickException.PICK_UNAUTHORIZED_ACCESS();
		}
		return pick;
	}

	@Override
	public Pick savePick(Pick pick) throws ApiPickException {
		pickRepository.findByUserAndLink(pick.getUser(), pick.getLink())
			.ifPresent((__) -> {
				throw ApiPickException.PICK_MUST_BE_UNIQUE_FOR_A_URL();
			});
		Pick savedPick = pickRepository.save(pick);

		for (Long tagId : pick.getTagOrder()) {
			Tag tag = tagRepository.findById(tagId).orElseThrow(ApiTagException::TAG_NOT_FOUND);
			if (ObjectUtils.notEqual(tag.getUser(), savedPick.getUser())) {
				throw ApiTagException.UNAUTHORIZED_TAG_ACCESS();
			}
			pickTagRepository.save(PickTag.of(savedPick, tag));
		}
		return savedPick;
	}

	@Override
	public void deletePick(Pick pick) {
		pickRepository.delete(pick);
		pickTagRepository.deleteByPick(pick);
	}

	@Override
	public void detachTagFromPick(Pick pick, Long tagId) {
		pickTagRepository.deleteByPickAndTagId(pick, tagId);
	}

	@Override
	public void detachTagFromEveryPick(Long tagId) {
		pickTagRepository.deleteByTagId(tagId);
	}
}
