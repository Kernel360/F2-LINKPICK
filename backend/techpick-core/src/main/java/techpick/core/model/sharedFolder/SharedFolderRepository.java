package techpick.core.model.sharedFolder;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RestController;

@RestController
public interface SharedFolderRepository extends JpaRepository<SharedFolder, UUID> {

	List<SharedFolder> findByUserId(Long userId);
}
