package com.example.clockee_server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

/**
 * ApplicationBean
 */
@Configuration
public class ApplicationBean {

  @Bean
  public JavaMailSender JavaMailSender(){
    return new JavaMailSenderImpl();
  }

}
