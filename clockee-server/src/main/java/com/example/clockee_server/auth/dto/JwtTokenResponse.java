package com.example.clockee_server.auth.dto;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * JwtTokenResponse
 */
@Data
@NoArgsConstructor
public class JwtTokenResponse {
  private String token;
  private String type = "Bearer";
  private Long id;
  private String username;
  private List<String> roles;

}
