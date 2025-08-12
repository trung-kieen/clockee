package com.example.clockee_server.controller;

import com.example.clockee_server.payload.response.PaymentResponse;
import com.example.clockee_server.service.user.StripeService;
import com.stripe.exception.StripeException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/payment/stripe")
public class StripeController {

  private final StripeService stripeService;

  @PostMapping("{orderId}")
  public ResponseEntity<PaymentResponse> getPaymentSecret(@PathVariable Long orderId)
      throws StripeException {
    var resp = stripeService.createPayment(orderId);
    return ResponseEntity.ok(resp);
  }
}
