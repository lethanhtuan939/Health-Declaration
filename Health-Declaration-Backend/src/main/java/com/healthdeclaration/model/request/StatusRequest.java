package com.healthdeclaration.model.request;

import com.healthdeclaration.util.enumeration.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class StatusRequest {
    UserStatus status;
}
