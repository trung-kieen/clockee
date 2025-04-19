package com.example.clockee_server.specification;

import com.example.clockee_server.entity.Product;
import org.springframework.data.jpa.domain.Specification;

/** ProductSpecification */
public class ProductSpecification {

  public static Specification<Product> searchByName(String name) {
    return (root, query, builder) -> builder.like(root.get("name"), name + "%");
  }

  public static Specification<Product> isNotDeleted() {
    return (root, query, builder) -> builder.isFalse(root.get("isDeleted"));
  }

  public static Specification<Product> latest() {
    return (root, query, criteriaBuilder) -> {
      query.orderBy(criteriaBuilder.desc(root.get("createdAt")));
      // Not filter just change order
      return criteriaBuilder.conjunction();
    };
  }

  public static Specification<Product> isActive() {
    return (root, query, cb) -> cb.isTrue(root.get("isActive"));
  }
  public static Specification<Product> isVisiable() {
    return (root, query, cb) -> cb.isTrue(root.get("visible"));
  }

}
