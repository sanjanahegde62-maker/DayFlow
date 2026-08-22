package com.dayflow.backend.service;

import com.dayflow.backend.entity.Employee;
import com.dayflow.backend.entity.Payroll;
import com.dayflow.backend.repository.EmployeeRepository;
import com.dayflow.backend.repository.PayrollRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class PayrollService {

    private final PayrollRepository payrollRepository;
    private final EmployeeRepository employeeRepository;

    public PayrollService(PayrollRepository payrollRepository,
                          EmployeeRepository employeeRepository) {
        this.payrollRepository = payrollRepository;
        this.employeeRepository = employeeRepository;
    }

    public Payroll createPayroll(Long employeeId, Payroll payroll) {

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        payroll.setEmployee(employee);

        BigDecimal basic = payroll.getBasicSalary() != null
                ? payroll.getBasicSalary() : BigDecimal.ZERO;

        BigDecimal allowances = payroll.getAllowances() != null
                ? payroll.getAllowances() : BigDecimal.ZERO;

        BigDecimal deductions = payroll.getDeductions() != null
                ? payroll.getDeductions() : BigDecimal.ZERO;

        payroll.setNetSalary(basic.add(allowances).subtract(deductions));

        return payrollRepository.save(payroll);
    }

    public Payroll getEmployeePayroll(Long employeeId) {
        return payrollRepository.findByEmployeeId(employeeId)
                .orElseThrow(() -> new RuntimeException("Payroll not found"));
    }

    public List<Payroll> getAllPayroll() {
        return payrollRepository.findAll();
    }
}