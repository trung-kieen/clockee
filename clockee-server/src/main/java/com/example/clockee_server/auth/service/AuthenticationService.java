package com.example.clockee_server.auth.service;

import com.example.clockee_server.auth.dto.CreateUserRequest;

public interface AuthenticationService {
  public void register(CreateUserRequest req);


}
