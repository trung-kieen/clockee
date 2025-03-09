package com.example.clockee_server.auth.service.impl;

import java.util.Set;

import org.springframework.stereotype.Service;

import com.example.clockee_server.auth.dto.CreateUserRequest;
import com.example.clockee_server.auth.service.AuthenticationService;
import com.example.clockee_server.entity.Role;
import com.example.clockee_server.entity.RoleName;
import com.example.clockee_server.entity.User;
import com.example.clockee_server.exception.ApiException;
import com.example.clockee_server.repository.RoleRepository;
import com.example.clockee_server.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class AuthenticationServiceImpl implements AuthenticationService{
  private final UserRepository userRepository;
  private final RoleRepository roleRepository;

  @Override
  public void register(CreateUserRequest req) {
    if (userRepository.existsByEmail(req.getEmail()))    {
      throw ApiException.builder()
      .message("EMAIL_ALREADY_EXISTS")
      .build();
    }
    // TODO Not allow disable user


    Role customerRole= roleRepository.findByRoleName(RoleName.CUSTOMER).orElseThrow(() -> {
      return ApiException.builder()
      .message("ROLE_NOT_FOUND")
      .status(500)
      .build();
    });
    User user = new User(req);
    user.setRoles(Set.of(customerRole));

    // TODO: Send verified email


  }


}
