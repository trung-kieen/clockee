package com.example.clockee_server.controller;

import com.example.clockee_server.auth.annotation.CurrentUser;
import com.example.clockee_server.auth.dto.CreateUserRequest;
import com.example.clockee_server.auth.dto.JwtTokenResponse;
import com.example.clockee_server.auth.dto.LoginRequest;
import com.example.clockee_server.auth.dto.RefreshTokenResponse;
import com.example.clockee_server.auth.service.AuthenticationService;
import com.example.clockee_server.entity.User;
import com.example.clockee_server.message.AppMessage;
import com.example.clockee_server.message.MessageKey;
import com.example.clockee_server.payload.response.CurrentUserDetails;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** AuthController */
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
  private final AuthenticationService authService;
  private final String refreshTokenCookieName = "refreshToken";

  @PostMapping("/login")
  public ResponseEntity<JwtTokenResponse> login(
      @RequestBody LoginRequest req, HttpServletResponse response) {
    JwtTokenResponse tokenResp = authService.login(req);
    // Add cookie token as header of response
    authService.addRefreshTokenToCookie(
        refreshTokenCookieName, tokenResp.getRefreshToken(), response);
    tokenResp.setRefreshToken(null);
    return ResponseEntity.ok(tokenResp);
  }

  @PostMapping("/register")
  public ResponseEntity<?> register(@Valid @RequestBody CreateUserRequest req) {
    authService.register(req);
    return ResponseEntity.ok().body(AppMessage.of(MessageKey.REGISTER_SUCCESS));
  }

  @GetMapping("/verify-email")
  public ResponseEntity<JwtTokenResponse> verifyEmail(@Param("token") int tokenId) {
    // TODO: verify user status
    return null;
  }

  // TODO: Move to user controller
  @PreAuthorize("isAuthenticated()")
  @GetMapping("/me")
  public ResponseEntity<?> currentUserDetail(@NotNull @CurrentUser User user) {
    CurrentUserDetails userDetails = authService.currentUserDetails(user);
    return ResponseEntity.ok(userDetails);
  }

  @GetMapping("/logout")
  public ResponseEntity<?> logoutUser(HttpServletResponse response) {
    // Clear cookie
    authService.clearRefreshTokenCookie(refreshTokenCookieName, response);
    return ResponseEntity.accepted().build();
  }

  @PostMapping("/refresh")
  public ResponseEntity<RefreshTokenResponse> refreshAccessToken(
      @CookieValue(name = "refreshToken", required = false) String refreshToken,
      HttpServletResponse response) {
    RefreshTokenResponse resp = authService.refresh(refreshToken, response);
    return ResponseEntity.ok(resp);
  }
}
