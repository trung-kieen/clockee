package com.example.clockee_server.controller.admin;

import com.example.clockee_server.dto.MonthlyRevenueDTO;
import com.example.clockee_server.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/revenue")
public class AdminOrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping("/by-month-year")
    public Double getRevenueByMonthAndYear(@RequestParam("month") int month, @RequestParam("year") int year) {
        return orderService.getRevenueByMonthAndYear(month, year);
    }

    @GetMapping("/monthly")
    public List<MonthlyRevenueDTO> getMonthlyRevenue() {
        return orderService.calculateMonthlyRevenue();
    }
}
