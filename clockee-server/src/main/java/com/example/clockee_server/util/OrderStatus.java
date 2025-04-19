package com.example.clockee_server.util;

@Client
public enum OrderStatus {
  PENDING("PENDING", "Chưa giải quyết"),
  PROCESSING("PROCESSING","Đang xử lý"),
  SHIPPED("SHIPPED","Đã giao"),
  RETURNING("RETURNING","Đang hoàn trả"),
  RETURNED("RETURNED","Đã hoàn trả"),
  CANCELLED("CANCELLED","Bị hủy"),
  COMPLETED("COMPLETED","Hoàn tất");

  private final String name;
  private final String value;

  OrderStatus(String value,String name) {
    this.name = name;
    this.value= value;
  }
  public String getValue() {
    return name;
  }

  public String getName() {
    return name;
  }

  @Override
  public String toString() {
    return value;
  }
}
