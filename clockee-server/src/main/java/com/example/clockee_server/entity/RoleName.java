package com.example.clockee_server.entity;

import lombok.Getter;

public enum RoleName {
  CUSTOMER("CUSTOMER"),
  PRODUCT_ADMIN("PRODUCT_ADMIN"),
  INVENTORY_MANAGER("INVENTORY_MANAGER");
  @Getter
  private String name;
  RoleName(String name) {
    this.name = name;
  }

}
