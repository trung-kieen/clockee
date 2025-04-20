package com.example.clockee_server.specification;

import ch.qos.logback.core.util.StringUtil;
import com.example.clockee_server.entity.Order;
import com.example.clockee_server.util.OrderStatus;
import org.springframework.data.jpa.domain.Specification;

/** OrderSpecification */
public class OrderSpecification {
  public static Specification<Order> withStatus(OrderStatus status) {
    return (root, query, criteriaBuilder) -> {
      if (status == null || StringUtil.isNullOrEmpty(status.toString())) {
        return criteriaBuilder.conjunction();
      }
      return criteriaBuilder.equal(root.get("status"), status);
    };
  }

  public static Specification<Order> withUserId(Long userId) {
    return (root, query, criteriaBuilder) -> {
      return criteriaBuilder.equal(root.get("user").get("userId"), userId);
    };
  }

  public static Specification<Order> latestOrder() {
    return (root, query, criteriaBuilder) -> {
      query.orderBy(criteriaBuilder.desc(root.get("createdAt")));
      // Not filter just change order
      return criteriaBuilder.conjunction();
    };
  }
}
