package com.example.clockee_server.mapper;

import com.example.clockee_server.entity.Product;
import com.example.clockee_server.file.FileStorageService;
import com.example.clockee_server.payload.response.AdminProductResponse;
import com.example.clockee_server.payload.response.user.UserProductResponse;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

/** ProductMapper */
@Service
@RequiredArgsConstructor
public class ProductMapper {
  private final ModelMapper mapper;
  private final FileStorageService fileStorageService;

  public AdminProductResponse productToAdminResponse(Product product) {
    var dto = mapper.map(product, AdminProductResponse.class);
    dto.setImage(fileStorageService.readFileFromLocation(product.getImageUrl()));
    return dto;
  }

  public UserProductResponse productToUserResponse(Product product) {
    var dto = mapper.map(product, UserProductResponse.class);
    dto.setImage(fileStorageService.readFileFromLocation(product.getImageUrl()));
    return dto;
  }
}
