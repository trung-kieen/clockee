package com.example.clockee_server.auth.service;

import com.example.clockee_server.auth.dto.CreateUserRequest;
import com.example.clockee_server.auth.dto.JwtTokenResponse;
import com.example.clockee_server.auth.dto.LoginRequest;

public interface AuthenticationService {
  public void register(CreateUserRequest req);

public JwtTokenResponse login(LoginRequest req);


}
