package com.example.clockee_server.payload.response;

import com.example.clockee_server.payload.dto.BrandDTO;
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
public class ProductDetailsResponse {
  private Long productId;
  private String name;
  private byte[] image;
  private Double sellPrice;
  private String description;
  private BrandDTO brand;
  private String type;
  private Boolean isActive;
  private Long stock;
}
