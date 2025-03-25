package com.example.clockee_server.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;
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
  @Schema(example = "nguyenvana123@gmail.com")
  private String email;
  @Schema(example = "vana123@gmail")
  private String password;

}
