package com.example.clockee_server.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * ApplicationBean
 * Dinh nghia cac class la bean de co the inject gia tri
 */
@Configuration
public class ApplicationBean {


  // @Bean
  //   public JavaMailSender javaMailSender() {
  //       JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
  //       mailSender.setHost("localhost");
  //       mailSender.setPort(1025);
  //       mailSender.setJavaMailProperties(getMailProperties());
  //       return mailSender;
  //   }

  //   private Properties getMailProperties() {
  //       Properties props = new Properties();
  //       props.put("mail.smtp.auth", "false");
  //       props.put("mail.smtp.starttls.enable", "false");
  //       return props;
  //   }
  @Bean
  public ModelMapper modelMapper(){
    return new ModelMapper();
  }

}
