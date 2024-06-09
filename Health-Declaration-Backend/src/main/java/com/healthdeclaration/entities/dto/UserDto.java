package com.healthdeclaration.entities.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.healthdeclaration.entities.Role;
import com.healthdeclaration.util.enumeration.EnumPattern;
import com.healthdeclaration.util.enumeration.Gender;
import com.healthdeclaration.util.enumeration.UserStatus;
import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private Long id;

    @NotBlank(message = "fullName must be not blank")
    private String fullName;

    @Pattern(regexp = "^\\d{10}$", message = "phone invalid format")
    private String phone;

    @Email(message = "email invalid format")
    private String email;

    @NotNull(message = "dateOfBirth must be not null")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dateOfBirth;

    @EnumPattern(name = "gender", regexp = "MALE|FEMALE|OTHER")
    private Gender gender;

    private String avatar;

    private String address;

    @Size(min = 15, max = 15, message = "Health insurance number must be exactly 15 characters")
    private String healthInsuranceNumber;

    @Size(min = 12, max = 12, message = "ID card number must be exactly 12 characters")
    private String idCard;

    @EnumPattern(name = "status", regexp = "ACTIVE|INACTIVE|NONE")
    private UserStatus status;

    private String uniqueId;

    private Date createdAt;

    private Date updatedAt;

    @Builder.Default
    private Set<Role> roles= new HashSet<>();
}
