package com.healthdeclaration.model.request;

import com.healthdeclaration.util.enumeration.EnumPattern;
import com.healthdeclaration.util.enumeration.Gender;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserRegisterRequest {

    @NotEmpty(message = "Email must not be empty")
    @Email(message = "Email invalid format")
    private String email;

    @NotEmpty(message = "Password must not be empty")
    private String password;

    @NotEmpty(message = "Repeat password must not be empty")
    private String repeatPassword;

    @EnumPattern(name = "gender", regexp = "MALE|FEMALE|OTHER")
    private Gender gender;

    @NotEmpty(message = "Address must not be empty")
    private String address;

    @Size(min = 15, max = 15, message = "Health insurance number must be exactly 15 characters")
    private String healthInsuranceNumber;

    @Size(min = 12, max = 12, message = "ID card number must be exactly 12 characters")
    private String idCard;
}
