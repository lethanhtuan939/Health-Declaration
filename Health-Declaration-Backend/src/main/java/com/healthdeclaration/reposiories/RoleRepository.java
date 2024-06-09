package com.healthdeclaration.reposiories;

import com.healthdeclaration.entities.Role;
import com.healthdeclaration.util.enumeration.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {

    Optional<Role> findByName(RoleType name);
}
