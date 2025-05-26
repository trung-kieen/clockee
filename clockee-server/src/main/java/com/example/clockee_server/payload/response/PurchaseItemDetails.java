package com.example.clockee_server.payload.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@Builder
@Getter
@Setter
@AllArgsConstructor
public class PurchaseItemDetails {
  private String productName;
  private String supplierName;
  private byte[] productImage;
  private Long quantity;
  private Double price;
}
