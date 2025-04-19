package com.example.clockee_server.controller.user;

import com.example.clockee_server.auth.annotation.CurrentUser;
import com.example.clockee_server.config.ApplicationConstants;
import com.example.clockee_server.entity.User;
import com.example.clockee_server.payload.request.CreateOrderRequest;
import com.example.clockee_server.service.CheckoutService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** CartController */
@RestController
@RequestMapping(ApplicationConstants.USER_URL_PREFIX + "/checkout")
@RequiredArgsConstructor
public class CheckoutController {
  private final CheckoutService checkoutService;

  @PostMapping
  public ResponseEntity<?> createOrder(
      @CurrentUser User user, @RequestBody CreateOrderRequest request) {
    checkoutService.createOrder(user, request);
    return ResponseEntity.accepted().build();
  }
}
