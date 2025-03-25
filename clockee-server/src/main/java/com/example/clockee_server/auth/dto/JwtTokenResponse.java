package com.example.clockee_server.auth.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * JwtTokenResponse
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JwtTokenResponse {
  private String accessToken;
  private String refreshToken;
  private String type = "Bearer";
  private Long id;
  private String username;
  private List<String> roles;
}
