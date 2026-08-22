package com.dayflow.backend.service;

import com.dayflow.backend.dto.SignupRequest;
import com.dayflow.backend.entity.User;
import com.dayflow.backend.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.dayflow.backend.dto.LoginRequest;

import java.util.UUID;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public User signup(SignupRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        if (userRepository.existsByEmployeeId(request.getEmployeeId())) {
            throw new RuntimeException("Employee ID already registered");
        }

        User user = new User();

        user.setEmployeeId(request.getEmployeeId());
        user.setEmail(request.getEmail());

        // Store encrypted password, never the raw password
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        user.setRole(request.getRole());

        // PS requires email verification
        user.setEmailVerified(false);

        // Temporary token for verification
        user.setVerificationToken(UUID.randomUUID().toString());

        return userRepository.save(user);
    }
    public User verifyEmail(String token) {

        User user = userRepository.findByVerificationToken(token)
                .orElseThrow(() ->
                        new RuntimeException("Invalid verification token"));

        user.setEmailVerified(true);
        user.setVerificationToken(null);

        return userRepository.save(user);
    }
    public User login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        if (!user.isEmailVerified()) {
            throw new RuntimeException("Email not verified");
        }
        String authToken = UUID.randomUUID().toString();
        user.setAuthToken(authToken);

        return userRepository.save(user);


    }
}