package com.example.clockee_server.controller.user;

import com.example.clockee_server.auth.annotation.CurrentUser;
import com.example.clockee_server.entity.User;
import com.example.clockee_server.payload.response.CurrentUserDetails;
import com.example.clockee_server.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** UserController */
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
  private final UserService userService;

  @PreAuthorize("isAuthenticated()")
  @GetMapping("/me")
  public ResponseEntity<CurrentUserDetails> currentUserDetail(@CurrentUser User user) {
    CurrentUserDetails userDetails = userService.currentUserDetails(user);
    return ResponseEntity.ok(userDetails);
  }
}
