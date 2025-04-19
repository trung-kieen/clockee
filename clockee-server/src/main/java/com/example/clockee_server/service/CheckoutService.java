package com.example.clockee_server.service;

import com.example.clockee_server.entity.CartItem;
import com.example.clockee_server.entity.Order;
import com.example.clockee_server.entity.OrderItem;
import com.example.clockee_server.entity.Product;
import com.example.clockee_server.entity.User;
import com.example.clockee_server.exception.ApiException;
import com.example.clockee_server.message.AppMessage;
import com.example.clockee_server.message.MessageKey;
import com.example.clockee_server.payload.request.CreateOrderRequest;
import com.example.clockee_server.repository.CartRepository;
import com.example.clockee_server.repository.OrderItemRepository;
import com.example.clockee_server.repository.OrderRepository;
import com.example.clockee_server.repository.ProductRepository;
import com.example.clockee_server.util.OrderStatus;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;

import org.hibernate.mapping.Array;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class CheckoutService {
  private final CartRepository cartRepository;
  private final OrderItemRepository orderItemRepository;
  private final OrderRepository orderRepository;
  private final ProductRepository productRepository;

  @Transactional
  public void createOrder(User user, CreateOrderRequest request) {

    // Only allow user to create order from items in cart => Search item in cart
    // with map
    var cartItems = cartRepository.findByUserId(user.getUserId());
    Map<Long, CartItem> productIdToCartItem = new HashMap<>();
    for (var item : cartItems) {
      productIdToCartItem.put(item.getProduct().getProductId(), item);
    }

    List<OrderItem> orderItems = new ArrayList<>();
    // Remove item in cart after purchase
    List<CartItem> pendingDeleteCartItems = new ArrayList<>();
    double totalPrice = 0;

    for (var requestCartItem : request.getItems()) {
      if (!productIdToCartItem.containsKey(requestCartItem.getProductId())) {
        // Not allow direct purchase item not in cart
        throw ApiException.builder()
            .message(AppMessage.of(MessageKey.PRODUCT_NOT_IN_CART))
            .status(400)
            .build();
      }
      // Get product price via cart item in database instead of user request
      CartItem cartItemDb = productIdToCartItem.get(requestCartItem.getProductId());
      pendingDeleteCartItems.add(cartItemDb);
      OrderItem orderItem =
          OrderItem.builder()
              .product(cartItemDb.getProduct())
              // .order(order)
              .quantity(requestCartItem.getQuantity())
              .price(cartItemDb.getProduct().getSellPrice())
              .build();
      orderItems.add(orderItem);

      totalPrice += orderItem.getTotalPrice();
    }


    Order order =
        Order.builder()
            .user(user)
            .address(request.getAddress())
            .phone(request.getPhone())
            .totalPrice(totalPrice) // Set price equal 0 as temporary
            // Wait for admin approve order request
            .status(OrderStatus.PENDING)
            .build();

    orderRepository.save(order);


    List<Product> productDecreaseStockLst = new ArrayList<>();
    for (var orderItem : orderItems) {
      orderItem.setOrder(order);
      // After create order, product for this order need to be decrease stock

      Product product = orderItem.getProduct();
      product.setStock(product.getStock() - orderItem.getQuantity());
      productDecreaseStockLst.add(product);
    }
    productRepository.saveAll(productDecreaseStockLst);

    order.setTotalPrice(totalPrice);
    // Create list orderItems for batch insert
    orderItemRepository.saveAll(orderItems);
    // Alternative, change flag to not display in user cart instead delete
    cartRepository.deleteAll(pendingDeleteCartItems);
  }
}
