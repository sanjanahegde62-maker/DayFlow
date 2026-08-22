package com.dayflow.backend.controller;

import com.dayflow.backend.repository.EmployeeRepository;
import com.dayflow.backend.repository.LeaveRequestRepository;
import com.dayflow.backend.repository.AttendanceRepository;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final EmployeeRepository employeeRepository;
    private final LeaveRequestRepository leaveRequestRepository;
    private final AttendanceRepository attendanceRepository;

    public DashboardController(
            EmployeeRepository employeeRepository,
            LeaveRequestRepository leaveRequestRepository,
            AttendanceRepository attendanceRepository) {
        this.employeeRepository = employeeRepository;
        this.leaveRequestRepository = leaveRequestRepository;
        this.attendanceRepository = attendanceRepository;
    }

    @GetMapping("/summary")
    public Map<String, Object> getSummary() {

        Map<String, Object> summary = new HashMap<>();

        summary.put("totalEmployees", employeeRepository.count());
        summary.put("totalLeaveRequests", leaveRequestRepository.count());
        summary.put("totalAttendanceRecords", attendanceRepository.count());

        return summary;
    }
}