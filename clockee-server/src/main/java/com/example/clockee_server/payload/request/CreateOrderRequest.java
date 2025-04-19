package com.example.clockee_server.payload.request;

import java.util.List;

import org.hibernate.validator.constraints.Length;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateOrderRequest {
  @Length(max = 11, message = "Số điện thoại tối đa 11 ký tự")
  private String phone;
  private String address;
  private List<CartItemRequest> items;
}
