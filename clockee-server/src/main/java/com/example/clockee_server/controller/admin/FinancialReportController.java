package com.example.clockee_server.controller.admin;

import com.example.clockee_server.payload.dto.FinancialReportDTO;
import com.example.clockee_server.service.FinancialReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/financial-report")
public class FinancialReportController {
  @Autowired private FinancialReportService financialReportService;

  @GetMapping("/by-year-month")
  public ResponseEntity<FinancialReportDTO> geFinancialReport(
      @RequestParam("year") int year, @RequestParam("month") int month) {
    FinancialReportDTO report = financialReportService.getFinancialReport(year, month);

    return ResponseEntity.ok(report);
  }
}
