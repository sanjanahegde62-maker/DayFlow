package com.dayflow.backend.controller;

import com.dayflow.backend.entity.Attendance;
import com.dayflow.backend.service.AttendanceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @PostMapping("/check-in/{employeeId}")
    public ResponseEntity<Attendance> checkIn(@PathVariable Long employeeId) {
        return ResponseEntity.ok(attendanceService.checkIn(employeeId));
    }

    @PostMapping("/check-out/{employeeId}")
    public ResponseEntity<Attendance> checkOut(@PathVariable Long employeeId) {
        return ResponseEntity.ok(attendanceService.checkOut(employeeId));
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<Attendance>> getAttendance(
            @PathVariable Long employeeId) {
        return ResponseEntity.ok(
                attendanceService.getEmployeeAttendance(employeeId)
        );
    }
}