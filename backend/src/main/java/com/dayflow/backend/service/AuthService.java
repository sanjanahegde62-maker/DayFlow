package com.dayflow.backend.service;

import com.dayflow.backend.dto.LoginRequest;
import com.dayflow.backend.dto.SignupRequest;
import com.dayflow.backend.entity.User;
import com.dayflow.backend.exception.DuplicateEmailException;
import com.dayflow.backend.exception.InvalidCredentialsException;
import com.dayflow.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Locale;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public User signup(SignupRequest request) {
        String normalizedEmail = request.getEmail() == null ? "" : request.getEmail().trim().toLowerCase(Locale.ROOT);
        String normalizedEmployeeId = request.getEmployeeId() == null ? "" : request.getEmployeeId().trim();

        if (userRepository.existsByEmail(normalizedEmail)) {
            throw new DuplicateEmailException("Email already registered");
        }

        if (userRepository.existsByEmployeeId(normalizedEmployeeId)) {
            throw new DuplicateEmailException("Employee ID already registered");
        }

        User user = new User();
        user.setEmployeeId(normalizedEmployeeId);
        user.setEmail(normalizedEmail);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        user.setEmailVerified(true);
        user.setVerificationToken(null);
        user.setAuthToken(jwtService.generateToken(normalizedEmail));

        return userRepository.save(user);
    }

    public User verifyEmail(String token) {
        User user = userRepository.findByVerificationToken(token)
                .orElseThrow(() -> new InvalidCredentialsException("Invalid verification token"));

        user.setEmailVerified(true);
        user.setVerificationToken(null);

        return userRepository.save(user);
    }

    public User login(LoginRequest request) {
        String normalizedEmail = request.getEmail() == null ? "" : request.getEmail().trim().toLowerCase(Locale.ROOT);

        User user = userRepository.findByEmail(normalizedEmail)
                .orElseThrow(() -> new InvalidCredentialsException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

        String token = jwtService.generateToken(user.getEmail());
        user.setAuthToken(token);

        return userRepository.save(user);
    }
}