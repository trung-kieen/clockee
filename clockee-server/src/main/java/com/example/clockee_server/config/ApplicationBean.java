package com.example.clockee_server.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/** ApplicationBean define bean for application context */
@Configuration
public class ApplicationBean {

  @Bean
  public ModelMapper modelMapper() {
    return new ModelMapper();
  }
}
