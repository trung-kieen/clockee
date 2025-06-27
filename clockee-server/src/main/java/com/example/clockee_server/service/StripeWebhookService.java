package com.example.clockee_server.service;

import com.stripe.model.Event;
import com.stripe.net.Webhook;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.event.LoggerListener;

import com.stripe.model.Event;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@RequiredArgsConstructor
public class StripeWebhookService {

  // If you are testing your webhook locally with the Stripe CLI you
  // can find the endpoint's secret by running `stripe listen`
  // Otherwise, find your endpoint's secret in your webhook settings in the
  // Developer Dashboard
  @Value("stripe.webhook.secret")
  private String webhookSecret;

  public void handleStripePaymentIntentWebhook(String payload, String header) throws SignatureVerificationException {
    Event event = Webhook.constructEvent(payload, header, webhookSecret);
    try {
      switch (event.getType()) {
        case "payment_intent.succeeded":
          handlePaymentIntentSuccess(event);
          break;
        case "payment_intent.payment_failed":
          // Payment failed - notify the user
          handlePaymentIntentFailed(event);
          break;
        default:
          log.error("Unhandle webhook event %s", event.getType());
          break;

      }

    } catch (Exception e) {
      // TODO: handle exception
    }

  }

  // https://dashboard.stripe.com/test/workbench/webhooks
  private void handlePaymentIntentFailed(Event event) {
    var data = event.getData();
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'handlePaymentIntentFailed'");
  }

  private void handlePaymentIntentSuccess(Event event) {
    var data = event.getData();
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'handlePaymentIntentSuccess'");
  }

}
