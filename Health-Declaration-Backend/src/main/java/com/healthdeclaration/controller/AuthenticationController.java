package com.healthdeclaration.controller;

import com.healthdeclaration.entities.Token;
import com.healthdeclaration.entities.dto.UserDto;
import com.healthdeclaration.model.request.UserLoginRequest;
import com.healthdeclaration.model.request.UserRegisterRequest;
import com.healthdeclaration.model.response.AuthenticationResponse;
import com.healthdeclaration.model.response.ResponseObject;
import com.healthdeclaration.services.AuthenticationService;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<ResponseObject<AuthenticationResponse>> login(@Valid @RequestBody UserLoginRequest user) {
        return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.<AuthenticationResponse>builder()
                .status(HttpStatus.OK.value())
                .message("Successfully!")
                .data(authenticationService.login(user))
                .build());
    }

    @PostMapping("/register")
    public ResponseEntity<ResponseObject<UserDto>> register(@Valid @RequestBody UserRegisterRequest user) throws MessagingException {
        return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.<UserDto>builder()
                .status(HttpStatus.OK.value())
                .message("Successfully!")
                .data(authenticationService.register(user))
                .build());
    }

    @GetMapping("/verify/{token}")
    public ResponseEntity<ResponseObject<UserDto>> verify(@PathVariable String token) {
        return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.<UserDto>builder()
                .status(HttpStatus.OK.value())
                .message("Successfully!")
                .data(authenticationService.verify(token))
                .build());
    }

    @PostMapping("/introspect")
    public ResponseEntity<ResponseObject<Boolean>> introspect(@RequestParam String token) {
        return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.<Boolean>builder()
                .status(HttpStatus.OK.value())
                .message("Successfully!")
                .data(authenticationService.introspect(token))
                .build());
    }
}
