package com.example.clockee_server.payload.request;

import org.hibernate.validator.constraints.Length;

import com.example.clockee_server.util.Client;
import com.example.clockee_server.validatetor.PasswordMatch;

import io.micrometer.common.lang.Nullable;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;
import lombok.Data;

/**
 * CreateUserRequest / RegisterUserRequest
 */
@Data
@PasswordMatch(passwordField = "password", passwordConfirmationFieldName  = "passwordConfirmation")
@Builder
@Client
public class CreateUserRequest {
  @Email
  // @Unique(columnName = "email", tableName = "user", message = "User with this email already exists")
  private String email;
  @NotNull
  @Length(min = 8)
  @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message = "must contain at least one uppercase letter, one lowercase letter, and one digit.")
  private String password;
  private String passwordConfirmation;
  @Nullable
  private String firstName;
  @Nullable
  private String lastName;



}
