package com.example.clockee_server.payload.response;

import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CouponDetails {
  private String description;
  private BigDecimal percentOff;
  private Long amountOff;
  private String duration;
}
