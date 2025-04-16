package com.example.clockee_server.auth.service;

import com.example.clockee_server.auth.dto.CreateUserRequest;
import com.example.clockee_server.auth.dto.JwtTokenResponse;
import com.example.clockee_server.auth.dto.LoginRequest;
import com.example.clockee_server.auth.dto.RefreshTokenResponse;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthenticationService {
  public void register(CreateUserRequest req);

  public JwtTokenResponse login(LoginRequest req);

  public RefreshTokenResponse refresh(String refreshToken, HttpServletResponse response);

  public void addRefreshTokenAsCookie(
      String cookieName, String token, HttpServletResponse response);

  public void clearRefreshTokenCookie(String refreshTokenCookieName, HttpServletResponse response);
}
