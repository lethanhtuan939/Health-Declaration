package com.healthdeclaration.services;

import com.healthdeclaration.entities.Token;
import com.healthdeclaration.entities.dto.UserDto;
import com.healthdeclaration.model.request.UserLoginRequest;
import com.healthdeclaration.model.request.UserRegisterRequest;
import com.healthdeclaration.model.response.AuthenticationResponse;
import jakarta.mail.MessagingException;

public interface AuthenticationService {

    AuthenticationResponse login(UserLoginRequest request);
    UserDto register(UserRegisterRequest request) throws MessagingException;

    UserDto verify(String token);

    boolean introspect(String token);
}
