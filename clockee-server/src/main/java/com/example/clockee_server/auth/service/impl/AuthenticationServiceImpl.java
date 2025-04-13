package com.example.clockee_server.auth.service.impl;

import com.example.clockee_server.auth.dto.CreateUserRequest;
import com.example.clockee_server.auth.dto.JwtTokenResponse;
import com.example.clockee_server.auth.dto.LoginRequest;
import com.example.clockee_server.auth.dto.RefreshTokenResponse;
import com.example.clockee_server.auth.jwt.JwtTokenProvider;
import com.example.clockee_server.auth.service.AuthenticationService;
import com.example.clockee_server.config.ApplicationProperties;
import com.example.clockee_server.entity.Role;
import com.example.clockee_server.entity.RoleName;
import com.example.clockee_server.entity.User;
import com.example.clockee_server.entity.VerificationCode;
import com.example.clockee_server.exception.ApiException;
import com.example.clockee_server.jobs.SendWelcomeEmailJob;
import com.example.clockee_server.message.AppMessage;
import com.example.clockee_server.message.MessageKey;
import com.example.clockee_server.payload.response.CurrentUserDetails;
import com.example.clockee_server.repository.RoleRepository;
import com.example.clockee_server.repository.UserRepository;
import com.example.clockee_server.repository.VerificationCodeRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.jobrunr.scheduling.BackgroundJobRequest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class AuthenticationServiceImpl implements AuthenticationService {
  private final UserRepository userRepository;
  private final RoleRepository roleRepository;
  private final VerificationCodeRepository verificationCodeRepository;
  private final AuthenticationManager authenticationManager;
  private final JwtTokenProvider jwtTokenProvider;
  private final UserDetailsService userDetailsService;
  private final ApplicationProperties applicationProperties;

  @Transactional
  public void register(CreateUserRequest req) {
    if (userRepository.existsByEmail(req.getEmail())) {
      throw ApiException.builder().message(AppMessage.of(MessageKey.EMAIL_ALREADY_EXISTS)).build();
    }

    Role customerRole =
        roleRepository
            .findByRoleName(RoleName.CUSTOMER)
            .orElseThrow(
                () -> {
                  return ApiException.builder().message("ROLE_NOT_FOUND").status(500).build();
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
  }

  @Override
  public JwtTokenResponse login(LoginRequest req) {
    // Authenticate with username password
    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
        new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword());

    Authentication auth = authenticationManager.authenticate(usernamePasswordAuthenticationToken);
    // After authenticate via filter, save context if authenticated user
    SecurityContext context = SecurityContextHolder.getContext();
    context.setAuthentication(auth);
    SecurityContextHolder.setContext(context);

    // Build jwt token for REST stateless
    User currentUser = (User) auth.getPrincipal();
    List<String> roles =
        currentUser.getRoles().stream()
            .map(
                (role) -> {
                  return role.getRoleName().getName();
                })
            .collect(Collectors.toList());

    String jwtToken = jwtTokenProvider.genenerateToken(currentUser);
    String refreshToken = jwtTokenProvider.generateRefreshToken(currentUser);
    var resp = new JwtTokenResponse();
    resp.setUsername(currentUser.getEmail());
    resp.setId(currentUser.getUserId());
    resp.setAccessToken(jwtToken);
    resp.setRefreshToken(refreshToken);
    resp.setRoles(roles);

    return resp;
  }

  @Override
  public CurrentUserDetails currentUserDetails(User user) {
    return CurrentUserDetails.builder().userId(user.getUserId()).email(user.getUsername()).build();
  }

  @Override
  public RefreshTokenResponse refresh(String refreshToken, HttpServletResponse response) {
    if (refreshToken == null) {
      throw new BadCredentialsException(AppMessage.of(MessageKey.MISSING_REFRESH_TOKEN));
    }
    String userEmail = jwtTokenProvider.getUsername(refreshToken);
    User user = userRepository.findByEmail(userEmail).orElse(null);

    if (!jwtTokenProvider.isValidRefreshToken(refreshToken, user)) {
      throw new BadCredentialsException(AppMessage.of(MessageKey.INVALID_REFRESH_TOKEN));
    }

    String newAccessToken = jwtTokenProvider.genenerateToken(user);
    return RefreshTokenResponse.builder()
        .accessToken(newAccessToken)
        .username(user.getUsername())
        .roles(user.getRoles().stream().map(Role::getAuthority).toList())
        .build();
  }

  @Override
  public void addRefreshTokenToCookie(
      String cookieName, String refreshToken, HttpServletResponse response) {
    Cookie refreshTokenCookie = new Cookie(cookieName, refreshToken);
    refreshTokenCookie.setHttpOnly(true);
    refreshTokenCookie.setSecure(true);
    refreshTokenCookie.setPath("/");
    refreshTokenCookie.setMaxAge(applicationProperties.getJwtRefreshTokenExpDays() * 24 * 60 * 60);
    response.addCookie(refreshTokenCookie);
  }

  @Override
  public void clearRefreshTokenCookie(String cookieName, HttpServletResponse response) {
    Cookie cookie = new Cookie(cookieName, null);
    cookie.setMaxAge(0);
    cookie.setSecure(true);
    cookie.setHttpOnly(true);
    cookie.setPath("/");
    response.addCookie(cookie);
  }
}
