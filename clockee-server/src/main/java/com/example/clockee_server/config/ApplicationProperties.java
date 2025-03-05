package com.example.clockee_server.config;

import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;
import lombok.Setter;

/**
 * ApplicationProperties
 * Tap trung cac config cho application.properties vao prefix "app"
 * thay vi su dung config @Value cho ung dung o nhieu file
 *
 * De su dung inject bean nay roi dung getter de lay gia tri cho config
 * private final ApplicationProperties applicationProperties;
 *
 * Vi du getter properties to applicationProperties
 * config.setAllowedOrigins(applicationProperties.getAllowedOrigins());
 */
@Configuration
@ConfigurationProperties(prefix = "app")
@Setter
@Getter
public class ApplicationProperties {
  private List<String> allowedOrigins;
  private CharSequence jwtSecretKey;
  private Long jwtTokenExpMillis;

}
