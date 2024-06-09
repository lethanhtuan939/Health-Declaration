package com.healthdeclaration.services;

import com.healthdeclaration.entities.Role;
import com.healthdeclaration.entities.dto.UserDto;
import com.healthdeclaration.util.enumeration.RoleType;
import com.healthdeclaration.util.enumeration.UserStatus;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface UserService {

    UserDto findByUniqueId(String uniqueId);

    UserDto update(String uniqueId, UserDto userDto, MultipartFile avatar) throws IOException;

    Page<UserDto> findAll(String search, int pageNo, int pageSize, String sortBy);

    UserDto retrieveUser();

    UserDto addRole(String uniqueId, List<RoleType> roleTypes);

    UserDto removeRoles(String uniqueId, List<RoleType> roleTypes);

    UserDto changeStatus(String uniqueId, UserStatus status);

    List<Role> findAllRoles();
}
