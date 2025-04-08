package com.example.clockee_server.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.example.clockee_server.entity.Product;
import com.example.clockee_server.file.FileStorageService;
import com.example.clockee_server.payload.request.AdminProductRequest;
import com.example.clockee_server.payload.response.AdminProductResponse;

import lombok.RequiredArgsConstructor;

/**
 * ProductMapper
 */
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

  /*
   * Update product information base in request
   * Ignore product id
   */
  public void mapToExistsProduct(AdminProductRequest dto, Product entity) {
    mapper.typeMap(AdminProductRequest.class, Product.class)
        .addMappings(mapper -> mapper.skip(Product::setProductId))
        .map(dto, entity);

  }

}
