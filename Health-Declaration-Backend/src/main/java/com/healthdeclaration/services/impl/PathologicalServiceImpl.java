package com.healthdeclaration.services.impl;

import com.healthdeclaration.entities.Pathological;
import com.healthdeclaration.entities.dto.PathologicalDto;
import com.healthdeclaration.exception.ResourceNotFoundException;
import com.healthdeclaration.reposiories.PathologicalRepository;
import com.healthdeclaration.reposiories.SearchRepository;
import com.healthdeclaration.services.PathologicalService;
import com.healthdeclaration.util.enumeration.PathologicalStatus;
import com.healthdeclaration.util.enumeration.PathologicalType;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PathologicalServiceImpl implements PathologicalService {

    private final ModelMapper modelMapper;
    private final SearchRepository searchRepository;
    private final PathologicalRepository pathologicalRepository;

    @Override
    public Page<PathologicalDto> findAll(String search, int pageNo, int pageSize, PathologicalType type, PathologicalStatus status, String sortBy) {
        PageRequest pageRequest = PageRequest.of(pageNo, pageSize, Sort.by(sortBy != null ? sortBy : "id"));
        Page<Pathological> pages;
        if (search != null && !search.isEmpty()) {
            if (status != null && type != null) {
                pages = pathologicalRepository.findByStatusAndTypeAndNameContainingIgnoreCase(status, type, search, pageRequest);
            } else if (status != null) {
                pages = pathologicalRepository.findByStatusAndNameContainingIgnoreCase(status, search, pageRequest);
            } else if (type != null) {
                pages = pathologicalRepository.findByTypeAndNameContainingIgnoreCase(type, search, pageRequest);
            } else {
                pages = pathologicalRepository.findByNameContainingIgnoreCase(search, pageRequest);
            }
        } else if (status != null || type != null) {
            if (status != null && type != null) {
                pages = pathologicalRepository.findByStatusAndType(status, type, pageRequest);
            } else if (status != null) {
                pages = pathologicalRepository.findByStatus(status, pageRequest);
            } else {
                pages = pathologicalRepository.findByType(type, pageRequest);
            }
        } else {
            pages = pathologicalRepository.findAll(pageRequest);
        }

        return pages.map(pathological -> modelMapper.map(pathological, PathologicalDto.class));
    }

    @Override
    public PathologicalDto findById(Integer id) {
        Pathological pathological = pathologicalRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Pathological", "id", id));
        return modelMapper.map(pathological, PathologicalDto.class);
    }

    @Override
    public PathologicalDto createOrUpdate(PathologicalDto pathologicalDto) {
        Pathological pathological = modelMapper.map(pathologicalDto, Pathological.class);

        return modelMapper.map(pathologicalRepository.save(pathological), PathologicalDto.class);
    }
}
