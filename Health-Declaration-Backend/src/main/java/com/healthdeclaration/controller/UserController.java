package com.healthdeclaration.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.healthdeclaration.entities.dto.UserDto;
import com.healthdeclaration.model.request.RoleRequest;
import com.healthdeclaration.model.request.StatusRequest;
import com.healthdeclaration.model.response.PageResponse;
import com.healthdeclaration.model.response.ResponseObject;
import com.healthdeclaration.services.UserService;
import com.healthdeclaration.util.enumeration.UserStatus;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ResponseObject<PageResponse<List<UserDto>>>> findAll(
            @RequestParam(value = "q", required = false) String search,
            @RequestParam(name = "p", defaultValue = "0") int pageNo,
            @RequestParam(name = "limit", defaultValue = "10") int pageSize,
            @RequestParam(name = "sortBy", required = false) String sortBy
    ) {

        Page<UserDto> pages = userService.findAll(search, pageNo, pageSize, sortBy);

        PageResponse<List<UserDto>> pageResponse = PageResponse.<List<UserDto>>builder()
                .page(pageNo)
                .size(pageSize)
                .totalElements(pages.getTotalElements())
                .totalPages(pages.getTotalPages())
                .data(pages.getContent())
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.<PageResponse<List<UserDto>>>builder()
                .status(HttpStatus.OK.value())
                .message("Successfully!")
                .data(pageResponse)
                .build());
    }

    @GetMapping("/{uniqueId}")
    public ResponseEntity<ResponseObject<UserDto>> findByUniqueId(@PathVariable String uniqueId) {
        return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.<UserDto>builder()
                .status(HttpStatus.OK.value())
                .message("Successfully!")
                .data(userService.findByUniqueId(uniqueId))
                .build());
    }

    @PutMapping("/{uniqueId}")
    public ResponseEntity<ResponseObject<UserDto>> update(@PathVariable String uniqueId,
                                                          @Valid @RequestParam("data") String data,
                                                          @RequestParam(name= "avatar", required = false) MultipartFile avatar) throws IOException {

        UserDto userDto = new ObjectMapper().readValue(data, UserDto.class);

        return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.<UserDto>builder()
                .status(HttpStatus.OK.value())
                .message("Successfully!")
                .data(userService.update(uniqueId, userDto, avatar))
                .build());
    }

    @GetMapping("/me")
    public ResponseEntity<ResponseObject<UserDto>> retrieveUser() {
        return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.<UserDto>builder()
                .status(HttpStatus.OK.value())
                .message("Successfully!")
                .data(userService.retrieveUser())
                .build());
    }

    @PostMapping("/{uniqueId}/add-roles")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ResponseObject<UserDto>> addRole(@PathVariable String uniqueId, @RequestBody RoleRequest roleRequest) {
        return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.<UserDto>builder()
                .status(HttpStatus.OK.value())
                .message("Successfully!")
                .data(userService.addRole(uniqueId, roleRequest.getRoles()))
                .build());
    }

    @PostMapping("/{uniqueId}/remove-roles")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ResponseObject<UserDto>> removeRole(@PathVariable String uniqueId, @RequestBody RoleRequest roleRequest) {
        return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.<UserDto>builder()
                .status(HttpStatus.OK.value())
                .message("Successfully!")
                .data(userService.removeRoles(uniqueId, roleRequest.getRoles()))
                .build());
    }

    @PostMapping("/{uniqueId}/change-status")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ResponseObject<UserDto>> changeStatus(@PathVariable String uniqueId, @RequestBody StatusRequest status) {
        return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.<UserDto>builder()
                .status(HttpStatus.OK.value())
                .message("Successfully!")
                .data(userService.changeStatus(uniqueId, status.getStatus()))
                .build());
    }
}
