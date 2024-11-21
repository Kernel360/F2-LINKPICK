package techpick.core.model.pick;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PickTagRepository extends JpaRepository<PickTag, Long> {

	List<PickTag> findAllByPickId(Long pickId);

	List<PickTag> findAllByTagId(Long tagId);

	Optional<PickTag> findByPickAndTagId(Pick pick, Long tagId);

	void deleteByPick(Pick pick);

	void deleteByTagId(Long tagId);

	void deleteByPickAndTagId(Pick pick, Long tagId);
}
