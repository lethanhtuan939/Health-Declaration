package com.healthdeclaration.controller;

import com.healthdeclaration.entities.dto.PathologicalDto;
import com.healthdeclaration.model.response.PageResponse;
import com.healthdeclaration.model.response.ResponseObject;
import com.healthdeclaration.services.PathologicalService;
import com.healthdeclaration.util.enumeration.PathologicalStatus;
import com.healthdeclaration.util.enumeration.PathologicalType;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/pathological")
@RequiredArgsConstructor
public class PathologicalController {

    private final PathologicalService pathologicalService;

    @GetMapping
    public ResponseEntity<ResponseObject<PageResponse<List<PathologicalDto>>>> findAll(
            @RequestParam(value = "q", required = false) String search,
            @RequestParam(name = "p", defaultValue = "0") int pageNo,
            @RequestParam(name = "limit", defaultValue = "10") int pageSize,
            @RequestParam(value = "type", required = false) PathologicalType type,
            @RequestParam(value = "status", required = false) PathologicalStatus status,
            @RequestParam(name = "sortBy", required = false) String sortBy) {

        Page<PathologicalDto> pages = pathologicalService.findAll(search, pageNo, pageSize, type, status, sortBy);

        PageResponse<List<PathologicalDto>> pageResponse = PageResponse.<List<PathologicalDto>>builder()
                .page(pageNo)
                .size(pageSize)
                .totalElements(pages.getTotalElements())
                .totalPages(pages.getTotalPages())
                .data(pages.getContent())
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.<PageResponse<List<PathologicalDto>>>builder()
                .status(HttpStatus.OK.value())
                .message("Successfully!")
                .data(pageResponse)
                .build());
    }

    @GetMapping("/")
    public ResponseEntity<ResponseObject<List<PathologicalDto>>> findAll() {

        return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.<List<PathologicalDto>>builder()
                .status(HttpStatus.OK.value())
                .message("Successfully!")
                .data(pathologicalService.findAll())
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject<PathologicalDto>> findById(@PathVariable Integer id) {

        return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.<PathologicalDto>builder()
                .status(HttpStatus.OK.value())
                .message("Successfully!")
                .data(pathologicalService.findById(id))
                .build());
    }

    @PostMapping
    public ResponseEntity<ResponseObject<PathologicalDto>> create(@Valid @RequestBody PathologicalDto pathologicalDto) {

        return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.<PathologicalDto>builder()
                .status(HttpStatus.OK.value())
                .message("Successfully!")
                .data(pathologicalService.createOrUpdate(pathologicalDto))
                .build());
    }

    @PutMapping
    public ResponseEntity<ResponseObject<PathologicalDto>> update(@Valid @RequestBody PathologicalDto pathologicalDto) {

        return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.<PathologicalDto>builder()
                .status(HttpStatus.OK.value())
                .message("Successfully!")
                .data(pathologicalService.createOrUpdate(pathologicalDto))
                .build());
    }
}
