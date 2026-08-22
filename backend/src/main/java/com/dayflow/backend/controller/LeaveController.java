package com.dayflow.backend.controller;

import com.dayflow.backend.entity.LeaveRequest;
import com.dayflow.backend.entity.LeaveStatus;
import com.dayflow.backend.service.LeaveService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaves")
public class LeaveController {

    private final LeaveService leaveService;

    public LeaveController(LeaveService leaveService) {
        this.leaveService = leaveService;
    }

    @PostMapping("/employee/{employeeId}")
    public ResponseEntity<LeaveRequest> applyLeave(
            @PathVariable Long employeeId,
            @RequestBody LeaveRequest request) {

        return ResponseEntity.ok(
                leaveService.applyLeave(employeeId, request));
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<LeaveRequest>> getEmployeeLeaves(
            @PathVariable Long employeeId) {

        return ResponseEntity.ok(
                leaveService.getEmployeeLeaves(employeeId));
    }

    @GetMapping("/pending")
    public ResponseEntity<List<LeaveRequest>> getPendingLeaves() {
        return ResponseEntity.ok(
                leaveService.getPendingLeaves());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<LeaveRequest> updateStatus(
            @PathVariable Long id,
            @RequestParam LeaveStatus status) {

        return ResponseEntity.ok(
                leaveService.updateStatus(id, status));
    }
}