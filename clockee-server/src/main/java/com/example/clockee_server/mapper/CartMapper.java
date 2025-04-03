package com.example.clockee_server.mapper;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.example.clockee_server.entity.CartItem;
import com.example.clockee_server.payload.request.CartItemDTO;
import com.example.clockee_server.payload.response.CartDetailsResponse;
import com.example.clockee_server.payload.response.CartItemDetails;

import lombok.RequiredArgsConstructor;

/**
 * CartMapper
 */
@Component
@RequiredArgsConstructor
public class CartMapper {
  private final ModelMapper mapper;

  public CartItemDTO cartItemToDTO(CartItem item) {
    return mapper.map(item, CartItemDTO.class);
  }

  public CartItemDetails cartItemToDetails(CartItem item) {
    return CartItemDetails.builder()
        .productId(item.getProduct().getProductId())
        .name(item.getProduct().getName())
        .price(item.getProduct().getActualPrice())
        .quantity(item.getQuantity())
        .build();
  }

  public CartDetailsResponse cartItemsToDetails(List<CartItem> items) {

    List<CartItemDetails> itemsDetalsCollection = items.stream().map(this::cartItemToDetails).toList();
    Double totalPrice = itemsDetalsCollection.stream()
        .mapToDouble((item) -> item.getQuantity() * item.getPrice()).sum();
    return CartDetailsResponse.builder()
        .items(itemsDetalsCollection)
        .totalPrice(totalPrice)
        .build();
  }

}
