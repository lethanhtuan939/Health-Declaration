package com.healthdeclaration.reposiories;

import com.healthdeclaration.entities.User;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    Optional<User> findByUniqueId(String uniqueId);

    boolean existsByIdCard(String idCard);

    boolean existsByHealthInsuranceNumber(String healthInsuranceNumber);

    boolean existsByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.idCard LIKE %:search% OR u.fullName LIKE %:search% OR u.email LIKE %:search% " +
            "OR u.phone LIKE %:search% OR u.address LIKE %:search% OR u.healthInsuranceNumber LIKE %:search%")
    Page<User> findAllBySearch(String search, Pageable pageable);
}
