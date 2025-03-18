package com.example.clockee_server.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
/**
 * InitializeRunner
 */
import org.springframework.stereotype.Service;

import com.example.clockee_server.auth.dto.CreateUserRequest;
import com.example.clockee_server.auth.service.AuthenticationService;
import com.example.clockee_server.entity.User;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class InitializeRunner implements CommandLineRunner {
  private final AuthenticationService authenticationService;

  @Override
  public void run(String... args) throws Exception {

    CreateUserRequest req = CreateUserRequest.builder()
        .email("nguyenvana123@gmail.com")
        .name("nguyen van a")
        .password("vana123@gmail")
        .passwordConfirmation("vana123@gmail")
        .build();
    authenticationService.register(req);
  }

}
