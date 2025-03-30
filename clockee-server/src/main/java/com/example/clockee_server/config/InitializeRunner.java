package com.example.clockee_server.config;

import org.springframework.boot.CommandLineRunner;
/**
 * InitializeRunner
 */
import org.springframework.stereotype.Service;

import com.example.clockee_server.message.AppMessage;
import com.example.clockee_server.message.MessageKey;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class InitializeRunner implements CommandLineRunner {

  @Override
  public void run(String... args) throws Exception {
  }

}
