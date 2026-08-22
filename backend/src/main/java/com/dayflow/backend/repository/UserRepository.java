package com.dayflow.backend.repository;

import com.dayflow.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByEmployeeId(String employeeId);

    Optional<User> findByVerificationToken(String verificationToken);

    boolean existsByEmail(String email);

    boolean existsByEmployeeId(String employeeId);
}