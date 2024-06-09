package com.healthdeclaration.model.request;

import com.healthdeclaration.util.enumeration.RoleType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RoleRequest {

    private List<RoleType> roles;
}
