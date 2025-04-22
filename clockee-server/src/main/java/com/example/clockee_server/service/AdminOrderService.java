package com.example.clockee_server.service;

import com.example.clockee_server.entity.Order;
import com.example.clockee_server.exception.ResourceNotFoundException;
import com.example.clockee_server.mapper.MapperUtil;
import com.example.clockee_server.mapper.OrderMapper;
import com.example.clockee_server.payload.PageResponse;
import com.example.clockee_server.payload.dto.MonthlyRevenueDTO;
import com.example.clockee_server.payload.dto.OrderDTO;
import com.example.clockee_server.payload.request.UpdateOrderStatusRequest;
import com.example.clockee_server.payload.response.AdminOrderSummaryResponse;
import com.example.clockee_server.repository.OrderRepository;
import com.example.clockee_server.repository.ProductRepository;
import com.example.clockee_server.specification.OrderSpecification;
import com.example.clockee_server.util.OrderStatus;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.ArrayUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

/** AdminOrderService */
@Service
@Log4j2
public class AdminOrderService {
  @Autowired private OrderRepository orderRepository;
  @Autowired private OrderMapper mapper;
  @Autowired private ProductRepository productRepository;

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

  public OrderDTO getYearlyOrder(int year) {
    Long totalOrders = orderRepository.countOrdersByYear(year);
    Long shippedOrders = orderRepository.countOrdersByYearAndStatus(year, OrderStatus.SHIPPED);
    Long completedOrders = orderRepository.countOrdersByYearAndStatus(year, OrderStatus.COMPLETED);
    Long pendingOrders = orderRepository.countOrdersByYearAndStatus(year, OrderStatus.PENDING);
    Long processingOrders =
        orderRepository.countOrdersByYearAndStatus(year, OrderStatus.PROCESSING);
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
    Long otherOrders =
        pendingOrders + processingOrders + returningOrders + returnedOrders + cancelledOrders;

    return new OrderDTO(totalOrders, finishOrders, otherOrders);
  }

  public Double getRevenueByMonthAndYear(int year, int month) {
    log.info("Calling getRevenueByMonthAndYear with year: " + year + ", month: " + month);

    Optional<Double> revenue = orderRepository.getRevenueByMonthAndYear(year, month);

    if (revenue.isPresent()) {
      log.info("Revenue found: " + revenue.get());
    } else {
      log.info("No revenue found for year: " + year + ", month: " + month);
    }

    return revenue.orElse(0.0);
  }

  public PageResponse<AdminOrderSummaryResponse> getAllOrder(
      int page, int size, OrderStatus status) {
    Pageable pageable = PageRequest.of(page, size);

    Specification<Order> specification =
        OrderSpecification.fetchUsers()
            .and(OrderSpecification.withStatus(status))
            .and(OrderSpecification.orderByLatest());
    Page<Order> orders = orderRepository.findAll(specification, pageable);

    return MapperUtil.mapPageResponse(
        orders,
        (order) -> {
          AdminOrderSummaryResponse orderSummary =
              MapperUtil.mapObject(order, AdminOrderSummaryResponse.class);
          orderSummary.setCustomerName(order.getUser().getName());
          return orderSummary;
        });
  }

  public void updateStatus(Long orderId, UpdateOrderStatusRequest request) {
    OrderStatus newStatus = request.getStatus();
    Order order =
        orderRepository.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("order"));
    OrderStatus previousStatus = order.getStatus();
    int newStatusIdx = ArrayUtils.indexOf(OrderStatus.values(), newStatus);
    final boolean isInOrderChangeStatus =
        newStatusIdx > 0 && OrderStatus.values()[newStatusIdx - 1].equals(previousStatus);
    if (isInOrderChangeStatus) {
      // TODO: send email
    }
    order.setStatus(newStatus);
    orderRepository.save(order);
  }
}
