package com.example.clockee_server.auth;

import java.util.List;
import static org.springframework.security.web.util.matcher.AntPathRequestMatcher.antMatcher;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import com.example.clockee_server.config.ApplicationProperties;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

/**
 * SecurityConfiguration
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
  private final ApplicationProperties applicationProperties;
  private final UserDetailsService userDetailsService;




  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http.authorizeHttpRequests(customizer -> {
      customizer
          .requestMatchers(antMatcher(HttpMethod.POST, "/api/users")).permitAll()
          .requestMatchers(antMatcher(HttpMethod.GET, "/api/users/verify-email")).permitAll()
          .requestMatchers(antMatcher(HttpMethod.POST, "/api/users/forgot-password")).permitAll()
          .requestMatchers(antMatcher(HttpMethod.PATCH, "/api/users/reset-password")).permitAll()
          .requestMatchers(antMatcher(HttpMethod.POST, "/api/auth/login")).permitAll()
          .requestMatchers(antMatcher(HttpMethod.GET, "/api/auth/csrf")).permitAll()
          .requestMatchers(antMatcher(HttpMethod.GET, "/api/auth/impersonate")).hasRole("ADMIN")
          .requestMatchers(antMatcher(HttpMethod.GET, "/api/auth/impersonate/exit")).hasRole("PREVIOUS_ADMINISTRATOR")
          .requestMatchers(antMatcher(HttpMethod.GET, "/api/notifications/subscribe")).permitAll()
          .requestMatchers(antMatcher(HttpMethod.POST, "/api/notifications/delivery/**")).permitAll()
          .requestMatchers(antMatcher("/swagger-ui/**")).permitAll()
          .requestMatchers(antMatcher("/v3/api-docs/**")).permitAll()
          .requestMatchers(antMatcher("/swagger-resources/**")).permitAll()
          .requestMatchers(antMatcher("/webjars/**")).permitAll()
          .anyRequest().authenticated();
    });

    // http.oauth2Login(customizer -> {
    //   customizer.successHandler(oauth2LoginSuccessHandler);
    // });

    /*
     * Tra ve response loi xac thuc khi co exception xay ra o qua trinh xac thuc nguoi dung
     */
    http.exceptionHandling(customizer -> {
      customizer.authenticationEntryPoint(
          (request, response, authException) -> {
            response.sendError(401, "Unauthorized");
          });
    });

    http.addFilterBefore(new UsernamePasswordAuthenticationFilter(), LogoutFilter.class);
    http.userDetailsService(userDetailsService);

    http.csrf(AbstractHttpConfigurer::disable); // TODO: Implement jwt token based authentication


    http.cors(customizer -> {
      customizer.configurationSource(corsConfigurationSource());
    });

    return http.build();
  }




  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  /**
   * Danh sach trang cac origin (ip,port) duoc cho phep request
   * Giam thieu tan cong cors
   */
  private CorsConfigurationSource corsConfigurationSource() {
    return new CorsConfigurationSource() {
      @Override
      public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(applicationProperties.getAllowedOrigins());
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);
        return config;
      }
    };
  }

  /**
   * Cung cap xac thuc nguoi dung
   * Xac dinh nguoi dung nao thuc hien request
   */
  @Bean
  public AuthenticationManager authenticationManager() {
    DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
    daoAuthenticationProvider.setUserDetailsService(userDetailsService);
    daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
    return new ProviderManager(daoAuthenticationProvider);
  }


}
