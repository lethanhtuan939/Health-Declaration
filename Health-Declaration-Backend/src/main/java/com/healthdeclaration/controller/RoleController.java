package com.healthdeclaration.controller;

import com.healthdeclaration.entities.Role;
import com.healthdeclaration.entities.dto.UserDto;
import com.healthdeclaration.model.response.ResponseObject;
import com.healthdeclaration.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/roles")
public class RoleController {

    @Autowired
    UserService userService;

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ResponseObject<List<Role>>> findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.<List<Role>>builder()
                .status(HttpStatus.OK.value())
                .message("Successfully!")
                .data(userService.findAllRoles())
                .build());
    }
}
