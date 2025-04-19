package com.example.clockee_server.auth.dto;

import org.hibernate.validator.constraints.Length;

import com.example.clockee_server.validatetor.PasswordMatch;

import io.micrometer.common.lang.Nullable;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;
import lombok.Data;

/** CreateUserRequest / RegisterUserRequest */
@Data
@PasswordMatch(passwordField = "password", passwordConfirmationFieldName = "passwordConfirmation")
@Builder
public class CreateUserRequest {
  @Email
  // @Unique(columnName = "email", tableName = "user", message = "User with this email already exists")
  @Schema(example = "nguyenvana123@gmail.com")
  private String email;

  @NotNull
  @Length(min = 8)
  @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message = "must contain at least one uppercase letter, one lowercase letter, and one digit.")
  @Schema(example = "vana123@gmail")
  private String password;

  @Schema(example = "vana123@gmail")
  private String passwordConfirmation;

  @Nullable
  @Schema(example = "nguyen van a")
  private String name;
}
