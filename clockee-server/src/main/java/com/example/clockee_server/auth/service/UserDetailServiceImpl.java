package com.example.clockee_server.auth.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
/**
 * UserDetailServiceImpl
 */
import org.springframework.stereotype.Service;

import com.example.clockee_server.entity.User;
import com.example.clockee_server.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserDetailServiceImpl implements UserDetailsService {
  private final UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new UsernameNotFoundException("username not found"));

    return user;

  }

}
