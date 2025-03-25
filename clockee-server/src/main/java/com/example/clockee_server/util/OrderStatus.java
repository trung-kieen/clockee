package com.example.clockee_server.util;

public enum OrderStatus {
  PENDING("Chưa giải quyết"),
  PROCESSING("Đang xử lý"),
  SHIPPED("Đã giao"),
  RETURNING("Đang hoàn trả"),
  RETURNED("Đã hoàn trả"),
  CANCELLED("Bị hủy"),
  COMPLETED("Hoàn tất");

  private final String name;

  OrderStatus(String name) {
    this.name = name;
  }

  public String getName() {
    return name;
  }

  @Override
  public String toString() {
    return name;
  }
}
