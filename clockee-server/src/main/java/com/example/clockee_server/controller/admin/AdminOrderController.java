package com.example.clockee_server.controller.admin;

import com.example.clockee_server.payload.dto.MonthlyRevenueDTO;
import com.example.clockee_server.payload.dto.OrderDTO;
import com.example.clockee_server.service.OrderService;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/revenue")
public class AdminOrderController {
  @Autowired private OrderService orderService;

  @GetMapping("/by-month-year")
  public Double getRevenueByMonthAndYear(
      @RequestParam("year") int year, @RequestParam("month") int month) {
    return orderService.getRevenueByMonthAndYear(year, month);
  }

  @GetMapping("/monthly")
  public List<MonthlyRevenueDTO> getMonthlyRevenue() {
    return orderService.calculateMonthlyRevenue();
  }

  @GetMapping("/by-year")
  public List<Double> getMonthlyRevenueInYear(@RequestParam("year") int year) {
    List<Double> revenues = new ArrayList<>();

    for (int month = 1; month <= 12; month++) {
      Double revenue = orderService.getRevenueByMonthAndYear(year, month);
      revenues.add(revenue);
    }

    return ResponseEntity.ok(revenues).getBody();
  }

  @GetMapping("/order-by-year")
  public OrderDTO getYearlyOrder(@RequestParam("year") int year) {
    return orderService.getYearlyOrder(year);
  }
}
