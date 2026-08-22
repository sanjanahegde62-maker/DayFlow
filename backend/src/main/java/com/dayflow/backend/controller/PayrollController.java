package com.dayflow.backend.controller;

import com.dayflow.backend.entity.Payroll;
import com.dayflow.backend.service.PayrollService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payroll")
public class PayrollController {

    private final PayrollService payrollService;

    public PayrollController(PayrollService payrollService) {
        this.payrollService = payrollService;
    }

    @PostMapping("/employee/{employeeId}")
    public ResponseEntity<Payroll> createPayroll(
            @PathVariable Long employeeId,
            @RequestBody Payroll payroll) {

        return ResponseEntity.ok(
                payrollService.createPayroll(employeeId, payroll));
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<Payroll> getEmployeePayroll(
            @PathVariable Long employeeId) {

        return ResponseEntity.ok(
                payrollService.getEmployeePayroll(employeeId));
    }

    @GetMapping
    public ResponseEntity<List<Payroll>> getAllPayroll() {
        return ResponseEntity.ok(payrollService.getAllPayroll());
    }
}