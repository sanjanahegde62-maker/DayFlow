package com.dayflow.backend.service;

import com.dayflow.backend.entity.Employee;
import com.dayflow.backend.entity.LeaveRequest;
import com.dayflow.backend.entity.LeaveStatus;
import com.dayflow.backend.repository.EmployeeRepository;
import com.dayflow.backend.repository.LeaveRequestRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaveService {

    private final LeaveRequestRepository leaveRepository;
    private final EmployeeRepository employeeRepository;

    public LeaveService(LeaveRequestRepository leaveRepository,
                        EmployeeRepository employeeRepository) {
        this.leaveRepository = leaveRepository;
        this.employeeRepository = employeeRepository;
    }

    public LeaveRequest applyLeave(Long employeeId, LeaveRequest request) {

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        request.setEmployee(employee);
        request.setStatus(LeaveStatus.PENDING);

        return leaveRepository.save(request);
    }

    public List<LeaveRequest> getEmployeeLeaves(Long employeeId) {
        return leaveRepository.findByEmployeeId(employeeId);
    }

    public List<LeaveRequest> getPendingLeaves() {
        return leaveRepository.findByStatus(LeaveStatus.PENDING);
    }

    public LeaveRequest updateStatus(Long id, LeaveStatus status) {

        LeaveRequest leave = leaveRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Leave request not found"));

        leave.setStatus(status);

        return leaveRepository.save(leave);
    }
}