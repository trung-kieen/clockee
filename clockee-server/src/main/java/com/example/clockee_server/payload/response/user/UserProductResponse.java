package com.example.clockee_server.payload.response.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Based on our user homepage design, user can only see image, name of products and their name so
 * there will have only 3 attributes *
 */
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserProductResponse {
  private String name;
  private String imageUrl;
  private Double sellPrice;
}
