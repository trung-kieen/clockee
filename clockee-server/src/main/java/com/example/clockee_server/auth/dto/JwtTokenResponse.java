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
  private String accessToken;
  private String type = "Bearer";
  private Long id;
  private String username;
  private List<String> roles;

  // used when we create a refresh token.
  // a refresh token is valid for 30 days
  // that means that if a user is inactive for more than 30 days, he will be
  // required to log in again
  // TODO: refresh token
  // private String refreshToken;
}
