package com.example.clockee_server.service;

import com.example.clockee_server.entity.User;
import com.example.clockee_server.exception.ApiException;
import com.example.clockee_server.mapper.MapperUtil;
import com.example.clockee_server.message.AppMessage;
import com.example.clockee_server.message.MessageKey;
import com.example.clockee_server.payload.request.ChangePasswordRequest;
import com.example.clockee_server.payload.request.UpdateUserDetailsRequest;
import com.example.clockee_server.payload.response.CurrentUserDetails;
import com.example.clockee_server.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/** UserService */
@Service
@RequiredArgsConstructor
public class UserService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  public CurrentUserDetails currentUserDetails(User user) {
    return MapperUtil.mapObject(user, CurrentUserDetails.class);
  }

  public void updateUserDetails(User user, UpdateUserDetailsRequest details) {
    user.setName(details.getName());
    user.setPhone(details.getPhone());
    user.setAddress(details.getAddress());
    userRepository.save(user);
  }

  public void changePassword(User user, ChangePasswordRequest request) {
    // Validate old password is valid

    if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
      throw ApiException.builder().message(AppMessage.of(MessageKey.WRONG_PASSWORD)).build();
    }
    user.updatePassword(request.getNewPassword());
    userRepository.save(user);
  }
}
