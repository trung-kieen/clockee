package com.example.clockee_server.entity;

public enum PurchaseStatus {
  PENDING("PENDING", "Chưa giải quyết"),
  PROCESSING("PROCESSING", "Đang xử lý"),
  SUCCESS("SUCCESS", "Hoàn tất");

  private final String name;
  private final String description;

  PurchaseStatus(String name, String description) {
    this.name = name;
    this.description = description;
  }
}
