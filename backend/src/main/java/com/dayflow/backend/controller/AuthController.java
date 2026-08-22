package com.dayflow.backend.controller;

import com.dayflow.backend.dto.AuthResponse;
import com.dayflow.backend.dto.LoginRequest;
import com.dayflow.backend.dto.SignupRequest;
import com.dayflow.backend.entity.User;
import com.dayflow.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(
            @Valid @RequestBody SignupRequest request) {

        User user = authService.signup(request);
        return ResponseEntity.ok(toResponse(user));
    }

    @GetMapping("/verify")
    public ResponseEntity<AuthResponse> verifyEmail(
            @RequestParam String token) {

        User user = authService.verifyEmail(token);
        return ResponseEntity.ok(toResponse(user));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody LoginRequest request) {

        User user = authService.login(request);
        return ResponseEntity.ok(toResponse(user));
    }

    private AuthResponse toResponse(User user) {
        return new AuthResponse(
                user.getId(),
                user.getEmployeeId(),
                user.getEmail(),
                user.getRole(),
                user.isEmailVerified(),
                user.getAuthToken()
        );
    }
}