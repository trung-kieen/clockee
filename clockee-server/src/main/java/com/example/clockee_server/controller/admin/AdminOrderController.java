package com.example.clockee_server.controller.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.clockee_server.payload.dto.MonthlyRevenueDTO;
import com.example.clockee_server.service.OrderService;

@RestController
@RequestMapping("/revenue")
public class AdminOrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping("/by-month-year")
    public Double getRevenueByMonthAndYear(@RequestParam("year") int year, @RequestParam("month") int month) {
        return orderService.getRevenueByMonthAndYear(year, month);
    }

    @GetMapping("/monthly")
    public List<MonthlyRevenueDTO> getMonthlyRevenue() {
        return orderService.calculateMonthlyRevenue();
    }
}
