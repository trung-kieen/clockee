package com.example.clockee_server.mapper;

import com.example.clockee_server.entity.CartItem;
import com.example.clockee_server.file.FileStorageService;
import com.example.clockee_server.payload.request.CartItemRequest;
import com.example.clockee_server.payload.response.CartDetailsResponse;
import com.example.clockee_server.payload.response.CartItemDetails;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

/** CartMapper */
@Component
@RequiredArgsConstructor
public class CartMapper {
  private final ModelMapper mapper;
  private final FileStorageService fileStorageService;

  public CartItemRequest cartItemToDTO(CartItem item) {
    return mapper.map(item, CartItemRequest.class);
  }

  public CartItemDetails cartItemToDetails(CartItem item) {
    return CartItemDetails.builder()
        .productId(item.getProduct().getProductId())
        .name(item.getProduct().getName())
        .price(item.getProduct().getActualPrice())
        .quantity(item.getQuantity())
        .image(fileStorageService.readFileFromLocation(item.getProduct().getImageUrl()))
        .build();
  }

  public CartDetailsResponse cartItemsToDetails(List<CartItem> items) {

    List<CartItemDetails> itemsDetalsCollection =
        items.stream().map(this::cartItemToDetails).toList();
    Double totalPrice =
        itemsDetalsCollection.stream()
            .mapToDouble((item) -> item.getQuantity() * item.getPrice())
            .sum();
    return CartDetailsResponse.builder()
        .items(itemsDetalsCollection)
        .totalPrice(totalPrice)
        .build();
  }
}
