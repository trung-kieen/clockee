package com.example.clockee_server.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import com.example.clockee_server.config.ApplicationProperties;
import com.example.clockee_server.email.EmailService;
import com.example.clockee_server.entity.User;
import com.example.clockee_server.entity.VerificationCode;
import com.example.clockee_server.exception.ResourceNotFoundException;
import com.example.clockee_server.repository.UserRepository;
import com.example.clockee_server.repository.VerificationCodeRepository;
import com.example.clockee_server.service.SendEmailService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RequiredArgsConstructor
@Service
@Log4j2
public class SendEmailServiceImpl implements SendEmailService{

  private final UserRepository userRepository;
  private final ApplicationProperties applicationProperties;
  private final TemplateEngine templateEngine;
  private final EmailService emailService;
  private final VerificationCodeRepository verificationCodeRepository;
  @Value("${server.servlet.context-path}")
  private String contextPath;


  @Override
  public void sendWelcomeEmail(Long userId) {
    log.info("Run job sent email welcome user {}", userId);
    User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("USER_NOT_FOUND"));
    if (user.getVerificationCode() != null && !user.getVerificationCode().getEmailSent()){
      sendWelcomeEmail(user, user.getVerificationCode());
    }
  }

  private void sendWelcomeEmail(User user, VerificationCode verificationCode) {

    String verificationLink = applicationProperties.getBaseUrl() + contextPath + "/auth/verify-email?token=" + verificationCode.getCode();
    Context emailContext = new Context();
    emailContext.setVariable("username", user.getName());
    emailContext.setVariable("verificationLink", verificationLink);
    emailContext.setVariable("applicationName", applicationProperties.getApplicationName());

    String htmlBody = templateEngine.process("welcome-email", emailContext);
    emailService.sendHtmlMessage(List.of(user.getEmail()), "Welcome to our platform", htmlBody);
    verificationCode.setEmailSent(true);
    verificationCodeRepository.save(verificationCode);
  }


}
