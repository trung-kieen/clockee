package com.example.clockee_server.entity;

import lombok.Getter;

public enum RoleName {
  ROLE_CUSTOMER("CUSTOMER"),
  ROLE_PRODUCT("PRODUCT_ADMIN"),
  ROLE_INVENTORY("INVENTORY_MANAGER");
  @Getter
  private String name;
  RoleName(String name) {
    this.name = name;
  }

}
