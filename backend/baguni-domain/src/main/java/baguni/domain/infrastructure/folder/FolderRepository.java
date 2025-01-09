package baguni.domain.infrastructure.folder;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.data.repository.query.Param;

import baguni.domain.model.folder.Folder;
import jakarta.persistence.LockModeType;
import jakarta.persistence.QueryHint;

public interface FolderRepository extends JpaRepository<Folder, Long> {

	@Lock(value = LockModeType.PESSIMISTIC_WRITE)
	@QueryHints({
		@QueryHint(name = "javax.persistence.lock.timeout", value = "3000")
	})
	@Query("SELECT f FROM Folder f WHERE f.id=:id")
	Optional<Folder> findByIdForUpdate(Long id);

	List<Folder> findByUserId(Long userId);

	List<Folder> findByParentFolderId(Long parentFolderId);

	// TODO: QueryDSL 도입 후 리팩토링 필요
	@Query("SELECT f FROM Folder f WHERE f.user.id = :userId AND f.folderType = baguni.domain.model.folder.FolderType"
		+ ".UNCLASSIFIED")
	Folder findUnclassifiedByUserId(@Param("userId") Long userId);

	// TODO: QueryDSL 도입 후 리팩토링 필요
	@Query("SELECT f FROM Folder f WHERE f.user.id = :userId AND f.folderType = baguni.domain.model.folder.FolderType"
		+ ".RECYCLE_BIN")
	Folder findRecycleBinByUserId(@Param("userId") Long userId);

	// TODO: QueryDSL 도입 후 리팩토링 필요
	@Query("SELECT f FROM Folder f WHERE f.user.id = :userId AND f.folderType = baguni.domain.model.folder.FolderType"
		+ ".ROOT")
	Folder findRootByUserId(@Param("userId") Long userId);

	void deleteByUserId(Long userId);
}
