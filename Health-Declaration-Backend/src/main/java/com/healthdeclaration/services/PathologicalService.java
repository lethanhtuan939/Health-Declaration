package com.healthdeclaration.services;

import com.healthdeclaration.entities.dto.PathologicalDto;
import com.healthdeclaration.util.enumeration.PathologicalStatus;
import com.healthdeclaration.util.enumeration.PathologicalType;
import org.springframework.data.domain.Page;

import java.util.List;

public interface PathologicalService {

    Page<PathologicalDto> findAll(String search, int pageNo, int pageSize, PathologicalType type, PathologicalStatus status, String sortBy);

    PathologicalDto findById(Integer id);

    PathologicalDto createOrUpdate(PathologicalDto pathologicalDto);

    List<PathologicalDto> findAll();
}
