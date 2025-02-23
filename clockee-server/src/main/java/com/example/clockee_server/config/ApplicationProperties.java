package com.example.clockee_server.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;
import lombok.Setter;

/**
 * ApplicationProperties
 * Tap trung cac config cho application.properties vao prefix "app"
 * thay vi su dung config @Value cho ung dung o nhieu file
 */
@Configuration
@ConfigurationProperties(prefix = "app")
@Setter
@Getter
public class ApplicationProperties  {


}
