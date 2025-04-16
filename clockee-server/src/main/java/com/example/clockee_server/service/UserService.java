package com.example.clockee_server.service;

import com.example.clockee_server.entity.User;
import com.example.clockee_server.payload.response.CurrentUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/** UserService */
@Service
@RequiredArgsConstructor
public class UserService {

  public CurrentUserDetails currentUserDetails(User user) {
    return CurrentUserDetails.builder()
        .userId(user.getUserId())
        .email(user.getUsername())
        .name(user.getName())
        .phone(user.getPhone())
        .build();
  }
}
