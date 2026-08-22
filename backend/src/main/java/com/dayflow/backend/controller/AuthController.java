package com.dayflow.backend.controller;

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
    public ResponseEntity<User> signup(
            @Valid @RequestBody SignupRequest request) {

        return ResponseEntity.ok(authService.signup(request));
    }
    @GetMapping("/verify")
    public ResponseEntity<User> verifyEmail(
            @RequestParam String token) {

        return ResponseEntity.ok(authService.verifyEmail(token));
    }
}