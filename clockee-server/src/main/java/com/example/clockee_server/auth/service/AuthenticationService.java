package com.example.clockee_server.auth.service;

import com.example.clockee_server.auth.dto.CreateUserRequest;
import com.example.clockee_server.auth.dto.JwtTokenResponse;
import com.example.clockee_server.auth.dto.LoginRequest;
import com.example.clockee_server.entity.User;
import com.example.clockee_server.payload.response.CurrentUserDetails;

public interface AuthenticationService {
  public void register(CreateUserRequest req);

  public JwtTokenResponse login(LoginRequest req);

  public CurrentUserDetails currentUserDetails(User user);
}
