package com.example.clockee_server.service.user;

import com.example.clockee_server.config.ApplicationProperties;
import com.example.clockee_server.entity.Order;
import com.example.clockee_server.entity.Payment;
import com.example.clockee_server.entity.PaymentMethod;
import com.example.clockee_server.entity.PaymentStatus;
import com.example.clockee_server.entity.User;
import com.example.clockee_server.exception.ApiException;
import com.example.clockee_server.exception.ResourceNotFoundException;
import com.example.clockee_server.payload.request.CreateSubscriptionRequest;
import com.example.clockee_server.payload.response.CouponDetails;
import com.example.clockee_server.payload.response.PaymentResponse;
import com.example.clockee_server.repository.OrderRepository;
import com.example.clockee_server.repository.PaymentRepository;
import com.example.clockee_server.service.StripeWebhookService;
import com.example.clockee_server.util.StripeUtils;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.model.Coupon;
import com.stripe.model.Customer;
import com.stripe.model.Invoice;
import com.stripe.model.InvoiceItem;
import com.stripe.model.PaymentIntent;
import com.stripe.model.Subscription;
import com.stripe.param.InvoiceCreateParams;
import com.stripe.param.InvoiceItemCreateParams;
import com.stripe.param.PaymentIntentCreateParams;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class StripeService implements PaymentService {
  @Value("${stripe.key.secret}")
  private String secretKey;

  private final boolean saveProductDetailsInvoice = false;
  private final OrderRepository orderRepository;
  private final PaymentRepository paymentRepository;

  public String createSubscription(CreateSubscriptionRequest request, User user) {
    var customerId = createCustomer(user, request.getToken());
    if (customerId == null) {
      throw ApiException.builder().message("Unable to create user").build();
    }

    var subscriptionId = createSubscription(customerId, request.getPlan(), request.getCoupon());
    return subscriptionId;
  }

  /**
   * Save customer card information use for future reuse, subscription, refund
   *
   * @return customerId String
   */
  public String createCustomer(User user, String token) {
    String email = user.getEmail();
    String customerId = null;
    try {
      setSecretKey();
      Map<String, Object> customerParams = new HashMap<>();
      customerParams.put("description", "Customer for " + email);
      customerParams.put("email", email);
      /*
       * User card details use encryption with public as token
       * Checkout Stripe.js
       */
      customerParams.put("source", token);

      Customer customer = Customer.create(customerParams);
    } catch (StripeException e) {
      // TODO: api error
      e.printStackTrace();
    }

    return customerId;
  }

  private void setSecretKey() {
    Stripe.apiKey = secretKey;
  }

  public boolean cancelSubscription(String subscriptionId) {
    boolean status;
    try {
      setSecretKey();
      Subscription sub = Subscription.retrieve(subscriptionId);
      sub.cancel(new HashMap<>());
      status = true;
    } catch (Exception e) {
      e.printStackTrace();
      status = false;
    }
    return status;
  }

  /**
   * Retrive information about coupon belong too payment Use for create api for
   * get coupon details
   */
  public CouponDetails retriveCoupon(String code) {
    int dollaToCent = 100;
    try {
      setSecretKey();
      Coupon coupon = Coupon.retrieve(code);
      if (coupon != null && coupon.getValid()) {
        var amountOff = coupon.getAmountOff() / dollaToCent;
        var percentOff = coupon.getPercentOff();
        var duration = coupon.getDuration();
        String details = (coupon.getPercentOff() == null ? "$" + amountOff : percentOff + "%")
            + " OFF "
            + duration;
        return CouponDetails.builder()
            .description(details)
            .percentOff(percentOff)
            .amountOff(amountOff)
            .duration(duration)
            .build();
      }
    } catch (Exception e) {
      // TODO: handle exception
      e.printStackTrace();
    }
    return null;
  }

  public String createCharge(User user, String token, int amount) {
    String chargeId = null;
    String email = user.getEmail();
    try {
      setSecretKey();
      Map<String, Object> chargeParams = new HashMap<>();
      chargeParams.put("amount", amount); // In cent (integer) => Multiply with 100
      chargeParams.put("currency", "usd");
      chargeParams.put("description", "Charge for " + email);
      chargeParams.put("source", token);

      Charge charge = Charge.create(chargeParams);
      chargeId = charge.getId();
    } catch (StripeException e) {
      e.printStackTrace();
      // TODO: handle exception
    }
    return chargeId;
  }

  public String createSubscription(String customerId, String plan, String coupon) {
    String subscriptionId = null;
    try {
      setSecretKey();
      Map<String, Object> item = new HashMap<>();
      item.put("plan", plan);
      Map<String, Object> items = new HashMap<>();
      items.put("0", item);
      Map<String, Object> params = new HashMap<>();
      params.put("customer", customerId);
      params.put("items", items);

      // Add coupon if available
      if (!coupon.isEmpty()) {
        params.put("coupon", coupon);
      }
      Subscription sub = Subscription.create(params);
      subscriptionId = sub.getId();
    } catch (Exception e) {
      e.printStackTrace();
      // TODO: handle exception
    }
    return subscriptionId;
  }

  public PaymentResponse createPayment(Long orderId) throws StripeException {
    // Check if order is paid => refute repay
    Order order = orderRepository
        .findById(orderId)
        .orElseThrow(
            () -> {
              throw new ResourceNotFoundException("order");
            });
    return createPayment(order);
  }

  /**
   *
   * Save pay metadata for webhook `payment_id` {@link StripeWebhookService}
   */
  @Override
  @Transactional
  public PaymentResponse createPayment(Order order) throws StripeException {
    // Create payment intent

    // Create payment if not exist
    var payment = order.getPayment();
    if (payment == null) {
      payment = Payment.builder()
          .status(PaymentStatus.PENDING)
          .method(PaymentMethod.STRIPE)
          .order(order)
          .build();

      paymentRepository.save(payment);
    }

    if (!saveProductDetailsInvoice) {
      return PaymentResponse.builder()
          .clientSecret(createPaymentNoInvoiceDetails(order, payment).getClientSecret())
          .build();
    } else {
      return PaymentResponse.builder()
          .clientSecret(createPaymentInvoiceDetails(order, payment).getClientSecret())
          .build();
    }

  }

  /**
   * Store more specific information of invoice for each item in order
   * Current not save any information about shipping fee and coupon
   */
  private PaymentIntent createPaymentInvoiceDetails(Order order, Payment payment) throws StripeException {
    setSecretKey();

    var customerUser = order.getUser();
    Customer customer = StripeUtils.findOrCreateCustomer(customerUser.getEmail(), customerUser.getName());
    InvoiceCreateParams.builder()
        .setCustomer(customer.getId())
        .build();

    InvoiceCreateParams invoiceCreateParams = InvoiceCreateParams
        .builder()
        .putMetadata("payment_id", payment.getPaymentId().toString())
        .setCustomer(customer.getId())
        .build();
    Invoice invoice = Invoice.create(invoiceCreateParams);

    // Add product to invoice
    for (var item : order.getOrderItems()) {
      var appProduct = item.getProduct();
      var stripeProduct = StripeUtils.findOrCreateProduct(appProduct.getProductId(), appProduct.getName());
      var invoiceItemCreateParams = InvoiceItemCreateParams.builder()
          .setInvoice(invoice.getId())
          .setAmount((long) item.getPrice().doubleValue())
          .setQuantity(item.getQuantity())
          .setPriceData(
              InvoiceItemCreateParams.PriceData.builder()
                  .setProduct(stripeProduct.getId())
                  .setCurrency("vnd")
                  .setUnitAmountDecimal(BigDecimal.valueOf(item.getPrice().doubleValue()))
                  .build())
          .setCurrency("vnd")
          .build();
      InvoiceItem.create(invoiceItemCreateParams);
    }

    invoice = invoice.finalizeInvoice();

    var paymentIntent = PaymentIntent.retrieve(invoice.getPaymentIntent());
    return paymentIntent;
  }

  private PaymentIntent createPaymentNoInvoiceDetails(Order order, Payment payment) throws StripeException {

    setSecretKey();
    var customerUser = order.getUser();
    // Save or reused customer details
    Customer customer = StripeUtils.findOrCreateCustomer(customerUser.getEmail(), customerUser.getName());

    var paymentIntentCreateParams = PaymentIntentCreateParams.builder()
        // TODO: Checko * 100 as dollar
        .setAmount((long) ((order.getTotalPrice().doubleValue()))) // 1 dollar to 100 cent
        .setCurrency("vnd") // TODO: change to VND
        .setCustomer(customer.getId())
        // No hardcode specific payment method
        .setAutomaticPaymentMethods(
            PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                .setEnabled(true)
                .build())
        .putMetadata("payment_id", payment.getPaymentId().toString())
        .build();
    var intent = PaymentIntent.create(paymentIntentCreateParams);

    return intent;
  }
}
