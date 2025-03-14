package com.example.clockee_server.config;


import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

/**
 * ApplicationBean
 * Dinh nghia cac class la bean de co the inject gia tri
 */
@Configuration
public class ApplicationBean {

  @Bean
  public JavaMailSender JavaMailSender(){
    return new JavaMailSenderImpl();
  }

  @Bean
  public ModelMapper modelMapper(){
    return new ModelMapper();
  }

}
