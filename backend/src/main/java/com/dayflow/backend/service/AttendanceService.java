package com.dayflow.backend.service;

import com.dayflow.backend.entity.Attendance;
import com.dayflow.backend.entity.AttendanceStatus;
import com.dayflow.backend.entity.Employee;
import com.dayflow.backend.repository.AttendanceRepository;
import com.dayflow.backend.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final EmployeeRepository employeeRepository;

    public AttendanceService(AttendanceRepository attendanceRepository,
                             EmployeeRepository employeeRepository) {
        this.attendanceRepository = attendanceRepository;
        this.employeeRepository = employeeRepository;
    }

    public Attendance checkIn(Long employeeId) {

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        LocalDate today = LocalDate.now();

        if (attendanceRepository.findByEmployeeIdAndDate(employeeId, today).isPresent()) {
            throw new RuntimeException("Attendance already marked");
        }

        Attendance attendance = new Attendance();
        attendance.setEmployee(employee);
        attendance.setDate(today);
        attendance.setCheckIn(LocalDateTime.now());
        attendance.setStatus(AttendanceStatus.PRESENT);

        return attendanceRepository.save(attendance);
    }

    public Attendance checkOut(Long employeeId) {

        Attendance attendance = attendanceRepository
                .findByEmployeeIdAndDate(employeeId, LocalDate.now())
                .orElseThrow(() -> new RuntimeException("No check-in found"));

        attendance.setCheckOut(LocalDateTime.now());

        return attendanceRepository.save(attendance);
    }

    public List<Attendance> getEmployeeAttendance(Long employeeId) {
        return attendanceRepository.findByEmployeeId(employeeId);
    }
}