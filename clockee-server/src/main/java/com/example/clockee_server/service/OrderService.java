package com.example.clockee_server.service;

import com.example.clockee_server.payload.dto.MonthlyRevenueDTO;
import com.example.clockee_server.repository.OrderRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
  @Autowired private OrderRepository orderRepository;

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
    // Log tham số đầu vào để kiểm tra
    System.out.println("Calling getRevenueByMonthAndYear with year: " + year + ", month: " + month);

    Optional<Double> revenue = orderRepository.getRevenueByMonthAndYear(year, month);

    // Log kết quả từ repository
    if (revenue.isPresent()) {
      System.out.println("Revenue found: " + revenue.get());
    } else {
      System.out.println("No revenue found for year: " + year + ", month: " + month);
    }

    return revenue.orElse(0.0);
  }
}
