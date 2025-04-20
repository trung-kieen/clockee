package com.example.clockee_server.service;

import com.example.clockee_server.entity.Order;
import com.example.clockee_server.entity.OrderItem;
import com.example.clockee_server.entity.Product;
import com.example.clockee_server.entity.User;
import com.example.clockee_server.exception.ApiException;
import com.example.clockee_server.exception.ResourceNotFoundException;
import com.example.clockee_server.mapper.OrderMapper;
import com.example.clockee_server.message.AppMessage;
import com.example.clockee_server.message.MessageKey;
import com.example.clockee_server.payload.dto.MonthlyRevenueDTO;
import com.example.clockee_server.payload.response.OrderSummaryResponse;
import com.example.clockee_server.repository.OrderRepository;
import com.example.clockee_server.repository.ProductRepository;
import com.example.clockee_server.specification.OrderSpecification;
import com.example.clockee_server.util.OrderStatus;
import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Log4j2
public class OrderService {
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

  public List<OrderSummaryResponse> getAllByUser(User user, OrderStatus status) {

    Specification<Order> specification =
        OrderSpecification.withUserId(user.getUserId())
            .and(OrderSpecification.withStatus(status))
            .and(OrderSpecification.latestOrder());
    return orderRepository.findAll(specification).stream()
        .map(mapper::orderToOrderSummary)
        .collect(Collectors.toList());
  }

  @Transactional
  public void cancelOrder(Long orderId, User user) {
    Order order =
        orderRepository
            .findByUserIdAndOrderIdWithItems(user.getUserId(), orderId)
            .orElseThrow(() -> new ResourceNotFoundException("order"));

    EnumSet<OrderStatus> allowCancelStatus =
        EnumSet.of(OrderStatus.PENDING, OrderStatus.PROCESSING);
    if (!allowCancelStatus.contains(order.getStatus())) {
      throw ApiException.builder()
          .message(AppMessage.of(MessageKey.BAD_ORDER_STATUS))
          .status(400)
          .build();
    }

    List<Product> products = new ArrayList<>();
    for (OrderItem item : order.getOrderItems()) {
      Product product = item.getProduct();
      product.setStock(product.getStock() + item.getQuantity());
      products.add(product);
    }
    productRepository.saveAll(products);

    order.setStatus(OrderStatus.CANCELLED);
    orderRepository.save(order);
  }
}
