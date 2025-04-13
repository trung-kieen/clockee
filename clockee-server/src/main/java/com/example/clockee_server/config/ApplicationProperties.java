package com.example.clockee_server.config;

import java.util.List;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * ApplicationProperties Tap trung cac config cho application.properties vao prefix "app" thay vi su
 * dung config @Value cho ung dung o nhieu file
 *
 * <p>De su dung inject bean nay roi dung getter de lay gia tri cho config private final
 * ApplicationProperties applicationProperties;
 *
 * <p>Vi du getter properties to applicationProperties
 * config.setAllowedOrigins(applicationProperties.getAllowedOrigins());
 */
@Configuration
@ConfigurationProperties(prefix = "app")
@Setter
@Getter
public class ApplicationProperties {
  private List<String> allowedOrigins;
  private CharSequence jwtSecretKey;
  private Long jwtTokenExpMinutes;
  private String baseUrl;
  private String applicationName;
  private String uploadPath;
  private int jwtRefreshTokenExpDays;
  private String messagesFile;
  private String cookieName;
  private String refreshCookieName;
}
