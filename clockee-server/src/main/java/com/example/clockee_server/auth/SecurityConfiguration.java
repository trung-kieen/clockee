package com.example.clockee_server.auth;

import static org.springframework.security.web.util.matcher.AntPathRequestMatcher.antMatcher;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import com.example.clockee_server.auth.jwt.JwtTokenFilter;
import com.example.clockee_server.auth.jwt.LogRequestFilter;
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
  private final JwtTokenFilter jwtTokenFilter;
  private final AuthEntryPointJwt authEntryPointJwt;

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http.authorizeHttpRequests(customizer -> {
      customizer
          .requestMatchers(antMatcher(HttpMethod.POST, "/users")).permitAll()
          .requestMatchers(antMatcher(HttpMethod.GET, "/users/verify-email")).permitAll()
          .requestMatchers(antMatcher(HttpMethod.POST, "/users/forgot-password")).permitAll()
          .requestMatchers(antMatcher(HttpMethod.PATCH, "/users/reset-password")).permitAll()
          .requestMatchers(antMatcher(HttpMethod.POST, "/auth/login")).permitAll()
          .requestMatchers(antMatcher(HttpMethod.POST, "/auth/register")).permitAll()
          .requestMatchers(antMatcher(HttpMethod.POST, "/auth/register")).permitAll()
          .requestMatchers(antMatcher(HttpMethod.GET, "/auth/csrf")).permitAll()
          .requestMatchers(antMatcher(HttpMethod.GET, "/auth/impersonate")).hasRole("ADMIN")
          .requestMatchers(antMatcher(HttpMethod.GET, "/auth/impersonate/exit")).hasRole("PREVIOUS_ADMINISTRATOR")
          .requestMatchers(antMatcher(HttpMethod.GET, "/notifications/subscribe")).permitAll()
          .requestMatchers(antMatcher(HttpMethod.POST, "/notifications/delivery/**")).permitAll()
          .requestMatchers(antMatcher("/swagger-ui/**")).permitAll()
          .requestMatchers(antMatcher("/v3/api-docs/**")).permitAll()
          .requestMatchers(antMatcher("/swagger-resources/**")).permitAll()
          .requestMatchers(antMatcher("/webjars/**")).permitAll();
          // TODO: enable authenticated
          customizer.anyRequest().authenticated();
    });

    // http.oauth2Login(customizer -> {
    // customizer.successHandler(oauth2LoginSuccessHandler);
    // });

    /*
     * Tra ve response loi xac thuc khi co exception xay ra o qua trinh xac thuc
     * nguoi dung
     */

    http.exceptionHandling(customer -> {
      customer.authenticationEntryPoint(authEntryPointJwt);
    });
    // http.exceptionHandling(customizer -> {
    // customizer.authenticationEntryPoint(
    // (request, response, authException) -> {
    // response.sendError(401, "Unauthorized");
    // });
    // });

    // Change from cookiee base session to stateless => user store jwt token in
    // localStorage
    http.sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
    // Filter apply on request to put userdetails to application context if exist
    http.addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);
    // TODO: remove this
    http.addFilterBefore(new LogRequestFilter(), JwtTokenFilter.class);

    http.userDetailsService(userDetailsService);

    http.csrf(AbstractHttpConfigurer::disable);

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
