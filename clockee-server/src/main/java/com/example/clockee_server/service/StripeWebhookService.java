package com.example.clockee_server.service;

import com.example.clockee_server.entity.Payment;
import com.example.clockee_server.entity.PaymentStatus;
import com.example.clockee_server.exception.ApiException;
import com.example.clockee_server.exception.ResourceNotFoundException;
import com.example.clockee_server.repository.PaymentRepository;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.PaymentIntent;
import com.stripe.net.Webhook;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@RequiredArgsConstructor
public class StripeWebhookService {
  private final PaymentRepository paymentRepository;

  // If you are testing your webhook locally with the Stripe CLI you
  // can find the endpoint's secret by running `stripe listen`
  // Otherwise, find your endpoint's secret in your webhook settings in the
  // Developer Dashboard
  @Value("stripe.webhook.secret")
  private String webhookSecret;

  public void handleStripePaymentIntentWebhook(String payload, String header) throws SignatureVerificationException {
    try {
      Event event = Webhook.constructEvent(payload, header, webhookSecret);
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

    } catch (SignatureVerificationException e) {
      log.error("Webhook signature verification failed: " + e.getMessage());
      throw ApiException.builder()
          .message("Invalid signature")
          .status(400)
          .build();
    } catch (Exception e) {
      System.err.println("Webhook error: " + e.getMessage());
      throw ApiException.builder()
          .message("Webhook error")
          .status(400)
          .build();
    }

  }

  // https://dashboard.stripe.com/test/workbench/webhooks
  private void handlePaymentIntentFailed(Event event) {
    log.error("Unable to complete Stripe payment intent " + event.toString());
    return;
    // TODO Auto-generated method stub
  }

  private void handlePaymentIntentSuccess(Event event) {
    EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();
    if (dataObjectDeserializer.getObject().isPresent()) {
      PaymentIntent paymentIntent = (PaymentIntent) dataObjectDeserializer.getObject().get();
      String paymentIntentId = paymentIntent.getId(); // Unique PaymentIntent ID
      Long paymentId = Long.parseLong(paymentIntent.getMetadata().get("payment_id"));
      Payment payment = paymentRepository.findById(paymentId).orElseThrow(() -> {
        throw new ResourceNotFoundException("payment");
      });
      payment.setStatus(PaymentStatus.COMPLETED);
      paymentRepository.save(payment);
    }

  }

}
