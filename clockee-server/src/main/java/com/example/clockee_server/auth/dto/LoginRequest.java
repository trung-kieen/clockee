package com.example.clockee_server.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * LoginRequest
 */
@Data
public class LoginRequest {
  @Email
  @NotNull
  private String email;
  private String password;

}
