package com.example.clockee_server.auth.service.impl;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.jobrunr.scheduling.BackgroundJobRequest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.clockee_server.auth.dto.CreateUserRequest;
import com.example.clockee_server.auth.dto.JwtTokenResponse;
import com.example.clockee_server.auth.dto.LoginRequest;
import com.example.clockee_server.auth.jwt.JwtTokenProvider;
import com.example.clockee_server.auth.service.AuthenticationService;
import com.example.clockee_server.entity.Role;
import com.example.clockee_server.entity.RoleName;
import com.example.clockee_server.entity.User;
import com.example.clockee_server.entity.VerificationCode;
import com.example.clockee_server.exception.ApiException;
import com.example.clockee_server.jobs.SendWelcomeEmailJob;
import com.example.clockee_server.repository.RoleRepository;
import com.example.clockee_server.repository.UserRepository;
import com.example.clockee_server.repository.VerificationCodeRepository;
import com.example.clockee_server.service.SendEmailService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class AuthenticationServiceImpl implements AuthenticationService {
  private final UserRepository userRepository;
  private final RoleRepository roleRepository;
  private final VerificationCodeRepository verificationCodeRepository;
  private final AuthenticationManager authenticationManager;
  private final JwtTokenProvider jwtTokenProvider;
  private final SendEmailService sendEmailService;

  @Transactional
  public void register(CreateUserRequest req) {
    if (userRepository.existsByEmail(req.getEmail())) {
      throw ApiException.builder()
          .message("EMAIL_ALREADY_EXISTS")
          .build();
    }

    Role customerRole = roleRepository.findByRoleName(RoleName.CUSTOMER).orElseThrow(() -> {
      return ApiException.builder()
          .message("ROLE_NOT_FOUND")
          .status(500)
          .build();
    });
    User user = new User(req);
    user.setRoles(Set.of(customerRole));
    userRepository.save(user);

    sendVerificationEmail(user);
  }

  private void sendVerificationEmail(User user) {
    // Save token to check if user active email
    var verification = new VerificationCode(user);
    user.setVerificationCode(verification);
    verificationCodeRepository.save(verification);

    // Sent email async
    var sendWelcomeEmailJob = new SendWelcomeEmailJob(user.getUserId());
    BackgroundJobRequest.enqueue(sendWelcomeEmailJob);
    // sendEmailService.sendWelcomeEmail(user.getUserId());
  }

  @Override
  public JwtTokenResponse login(LoginRequest req) {
    // Authenticate with username password
    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
        req.getEmail(), req.getPassword());

    Authentication auth = authenticationManager.authenticate(usernamePasswordAuthenticationToken);
    // After authenticate via filter, save context if authenticated user
    SecurityContext context = SecurityContextHolder.getContext();
    context.setAuthentication(auth);
    SecurityContextHolder.setContext(context);

    // Build jwt token for REST stateless
    User currentUser = (User) auth.getPrincipal();
    List<String> roles = currentUser.getRoles().stream().map((role)-> {
      return role.getRoleName().getName();
    }).collect(Collectors.toList());

    String jwtToken = jwtTokenProvider.genenerateToken(currentUser);
    var resp = new JwtTokenResponse();
    resp.setUsername(currentUser.getEmail());
    resp.setId(currentUser.getUserId());
    resp.setToken(jwtToken);
    resp.setRoles(roles);

    return resp;
  }

}
