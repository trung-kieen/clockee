package com.example.clockee_server.specification;

import org.springframework.data.jpa.domain.Specification;

import com.example.clockee_server.entity.Product;

/**
 * ProductSpecification
 */
public class ProductSpecification {

  public static Specification<Product> searchByName(String name) {
    return (root, query, builder) -> builder.like(root.get("name"), name + "%");
  }

  public static Specification<Product> isDeleted() {
    return (root, query, builder) -> builder.isFalse(root.get("isDeleted"));
  }
}
