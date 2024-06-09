package com.healthdeclaration.reposiories;

import com.healthdeclaration.entities.Pathological;
import com.healthdeclaration.util.enumeration.PathologicalStatus;
import com.healthdeclaration.util.enumeration.PathologicalType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PathologicalRepository extends JpaRepository<Pathological, Integer> {
    Page<Pathological> findByStatusAndTypeAndNameContainingIgnoreCase(PathologicalStatus status, PathologicalType type, String name, Pageable pageable);

    Page<Pathological> findByStatusAndNameContainingIgnoreCase(PathologicalStatus status, String name, Pageable pageable);

    Page<Pathological> findByTypeAndNameContainingIgnoreCase(PathologicalType type, String name, Pageable pageable);

    Page<Pathological> findByNameContainingIgnoreCase(String name, Pageable pageable);

    Page<Pathological> findByStatusAndType(PathologicalStatus status, PathologicalType type, Pageable pageable);
    Page<Pathological> findByStatus(PathologicalStatus status, Pageable pageable);
    Page<Pathological> findByType(PathologicalType type, Pageable pageable);
}

