package com.example.clockee_server.service;

import jakarta.validation.constraints.NotNull;

/** EmailService */
public interface SendEmailService {

  void sendWelcomeEmail(@NotNull Long userId);
}
