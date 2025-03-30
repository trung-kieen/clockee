package com.example.clockee_server.controller;

import com.example.clockee_server.auth.jwt.JwtTokenProvider;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import com.example.clockee_server.auth.dto.CreateUserRequest;
import com.example.clockee_server.auth.dto.JwtTokenResponse;
import com.example.clockee_server.auth.dto.LoginRequest;
import com.example.clockee_server.auth.service.AuthenticationService;
import com.example.clockee_server.message.AppMessage;
import com.example.clockee_server.message.MessageKey;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

/**
 * AuthController
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
  private final AuthenticationService authService;
  private final JwtTokenProvider tokenProvider;
  private final UserDetailsService userDetailsService;

  @PostMapping("/login")
  public ResponseEntity<JwtTokenResponse> login(@RequestBody LoginRequest req, HttpServletResponse response){
    JwtTokenResponse tokenResp = authService.login(req);

    Cookie refreshTokenCookie = new Cookie("refreshToken", tokenResp.getRefreshToken());
    refreshTokenCookie.setHttpOnly(true);
    refreshTokenCookie.setSecure(false);
    refreshTokenCookie.setPath("/");
    refreshTokenCookie.setMaxAge(30*24*60*60);

    response.addCookie(refreshTokenCookie);

    tokenResp.setRefreshToken(null);

    return ResponseEntity.ok(tokenResp);
  }

  @PostMapping("/register")
  public ResponseEntity<?>  register(@Valid @RequestBody CreateUserRequest req){
    authService.register(req);
    return  ResponseEntity.ok().body(AppMessage.of(MessageKey.REGISTER_SUCCESS));
  }


  @GetMapping("/verify-email")

  public ResponseEntity<JwtTokenResponse> verifyEmail(@Param("token") int tokenId){
    // TODO: verify user status
    return null;
  }

  @PostMapping("/refresh")
  public ResponseEntity<?> refreshAccessToken(@CookieValue(name = "refreshToken", required = false) String refreshToken, HttpServletResponse response) {
    if (refreshToken == null) {
      return ResponseEntity.status(401).body("Refresh Token is missing");
    }

    String username = tokenProvider.getUsername(refreshToken);
    UserDetails user = userDetailsService.loadUserByUsername(username);

    if (!tokenProvider.isValidRefreshToken(refreshToken, user)) {
      return ResponseEntity.status(401).body("Refresh Token is invalid");
    }

    String newAccessToken = tokenProvider.genenerateToken(user);

    return ResponseEntity.ok(new JwtTokenResponse(newAccessToken, refreshToken, "Bearer", null, username, null));
  }
}
