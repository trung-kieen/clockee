package com.example.clockee_server.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.clockee_server.auth.dto.CreateUserRequest;
import com.example.clockee_server.auth.dto.JwtTokenResponse;
import com.example.clockee_server.auth.dto.LoginRequest;
import com.example.clockee_server.auth.service.AuthenticationService;

import lombok.RequiredArgsConstructor;

/**
 * AuthController
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
  private final AuthenticationService authService;

  @PostMapping("/login")
  public ResponseEntity<JwtTokenResponse> login(@RequestBody LoginRequest req){
    return null;
  }

  @PostMapping("/register")
  public ResponseEntity<?>  register(@RequestBody CreateUserRequest req){
    authService.register(req);
    return  ResponseEntity.ok().body("Register success, checkout email");
  }

}
