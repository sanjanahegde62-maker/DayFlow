package com.dayflow.backend.dto;

import com.dayflow.backend.entity.Role;

public class AuthResponse {

    private Long id;
    private String employeeId;
    private String email;
    private Role role;
    private boolean emailVerified;
    private String token;

    public AuthResponse() {
    }

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

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public boolean isEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(boolean emailVerified) {
        this.emailVerified = emailVerified;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}