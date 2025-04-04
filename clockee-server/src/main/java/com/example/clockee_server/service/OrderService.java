package com.example.clockee_server.service;

import com.example.clockee_server.dto.MonthlyRevenueDTO;
import com.example.clockee_server.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public List<MonthlyRevenueDTO> calculateMonthlyRevenue() {
        List<Object[]> results = orderRepository.getMonthlyRevenue();
        List<MonthlyRevenueDTO> revenueList = new ArrayList<>();

        for (Object[] result : results) {
            Integer year = (Integer) result[0];
            Integer month = (Integer) result[1];
            Double revenue = (Double) result[2];

            revenueList.add(new MonthlyRevenueDTO(year, month, revenue));
        }
        return revenueList;
    }

    public Double getRevenueByMonthAndYear(int year, int month) {
        Optional<Double> revenue = orderRepository.getRevenueByMonthAndYear(year, month);
        return revenue.orElse(0.0);
    }
}
