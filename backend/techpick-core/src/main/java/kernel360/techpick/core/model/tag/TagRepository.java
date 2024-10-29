package kernel360.techpick.core.model.tag;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Long> {

	boolean existsByUserIdAndName(Long userId, String name);

	List<Tag> findAllByUserId(Long userId);

	void deleteByIdAndUserId(Long id, Long userId);
}
