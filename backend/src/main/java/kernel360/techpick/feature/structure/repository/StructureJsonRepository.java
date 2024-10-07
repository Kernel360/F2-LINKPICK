package kernel360.techpick.feature.structure.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import kernel360.techpick.core.model.folder.StructureJson;

@Repository
public interface StructureJsonRepository extends JpaRepository<StructureJson, Long> {

	StructureJson findByUserId(Long userId);
}