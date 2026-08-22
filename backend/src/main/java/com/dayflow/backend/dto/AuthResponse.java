package com.dayflow.backend.dto;

import com.dayflow.backend.entity.Role;

public class AuthResponse {

    private Long id;
    private String employeeId;
    private String email;
    private Role role;
    private boolean emailVerified;
    private String token;

    public AuthResponse(Long id, String employeeId, String email,
                        Role role, boolean emailVerified, String token) {
        this.id = id;
        this.employeeId = employeeId;
        this.email = email;
        this.role = role;
        this.emailVerified = emailVerified;
        this.token = token;
    }

    public Long getId() {
        return id;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public String getEmail() {
        return email;
    }

    public Role getRole() {
        return role;
    }

    public boolean isEmailVerified() {
        return emailVerified;
    }
    public String getToken() {
        return token;
    }
}