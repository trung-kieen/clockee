package com.example.clockee_server.payload.dto;

import com.example.clockee_server.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserDetailResponse {
  private Long userId;
  private String email;
  private String name;
  private String phone;
  private Boolean isDeleted;
  private String address;

  public UserDetailResponse(User user) {
    this.userId = user.getUserId();
    this.email = user.getEmail();
    this.name = user.getName();
    this.phone = user.getPhone();
    this.address = user.getAddress();
    this.isDeleted = user.getIsDeleted();
  }
}
