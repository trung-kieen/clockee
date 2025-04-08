package com.example.clockee_server.payload.response;

import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminProductResponse {
  private Long productId;
  private String name;
  private String description;
  private Double actualPrice;
  private Double sellPrice;
  private String type;
  private Long stock;
  private String brandName;
  private Boolean isActive;
  private Boolean visible;
  private byte[] image;
}
