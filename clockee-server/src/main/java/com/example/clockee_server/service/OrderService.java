package com.example.clockee_server.service;

import com.example.clockee_server.payload.dto.MonthlyRevenueDTO;
import com.example.clockee_server.payload.dto.OrderDTO;
import com.example.clockee_server.repository.OrderRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.example.clockee_server.util.OrderStatus;
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
    System.out.println("Calling getRevenueByMonthAndYear with year: " + year + ", month: " + month);

    Optional<Double> revenue = orderRepository.getRevenueByMonthAndYear(year, month);

    if (revenue.isPresent()) {
      System.out.println("Revenue found: " + revenue.get());
    } else {
      System.out.println("No revenue found for year: " + year + ", month: " + month);
    }

    return revenue.orElse(0.0);
  }

  public OrderDTO getYearlyOrder(int year) {
    Long totalOrders = orderRepository.countOrdersByYear(year);
    Long shippedOrders = orderRepository.countOrdersByYearAndStatus(year, OrderStatus.SHIPPED);
    Long completedOrders = orderRepository.countOrdersByYearAndStatus(year, OrderStatus.COMPLETED);
    Long pendingOrders = orderRepository.countOrdersByYearAndStatus(year, OrderStatus.PENDING);
    Long processingOrders = orderRepository.countOrdersByYearAndStatus(year, OrderStatus.PROCESSING);
    Long returningOrders = orderRepository.countOrdersByYearAndStatus(year, OrderStatus.RETURNING);
    Long returnedOrders = orderRepository.countOrdersByYearAndStatus(year, OrderStatus.RETURNED);
    Long cancelledOrders = orderRepository.countOrdersByYearAndStatus(year, OrderStatus.CANCELLED);

    totalOrders = totalOrders != null ? totalOrders : 0L;
    shippedOrders = shippedOrders != null ? shippedOrders : 0L;
    completedOrders = completedOrders != null ? completedOrders : 0L;
    pendingOrders = pendingOrders != null ? pendingOrders : 0L;
    processingOrders = processingOrders != null ? processingOrders : 0L;
    returningOrders = returningOrders != null ? returningOrders : 0L;
    returnedOrders = returnedOrders != null ? returnedOrders : 0L;
    cancelledOrders = cancelledOrders != null ? cancelledOrders : 0L;

    Long finishOrders = shippedOrders + completedOrders;
    Long otherOrders =  pendingOrders + processingOrders + returningOrders + returnedOrders + cancelledOrders;

    return new OrderDTO(totalOrders, finishOrders, otherOrders);
  }
}
