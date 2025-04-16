package com.example.clockee_server.service.user;

import com.example.clockee_server.entity.Product;
import com.example.clockee_server.exception.ResourceNotFoundException;
import com.example.clockee_server.mapper.ProductMapper;
import com.example.clockee_server.message.AppMessage;
import com.example.clockee_server.message.MessageKey;
import com.example.clockee_server.payload.response.ProductDetailsResponse;
import com.example.clockee_server.payload.response.ProductSummaryResponse;
import com.example.clockee_server.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserProductService {
  @Autowired private final ProductRepository productRepository;

  @Autowired private final ProductMapper productMapper;

  // Lấy danh sách sản phẩm của user có phân trang
  public Page<ProductSummaryResponse> getAllProducts(int page, int size) {
    Pageable pageable = PageRequest.of(page, size);
    Page<Product> products = productRepository.getAllActiveProducts(pageable);

    if (products.isEmpty()) {
      return Page.empty();
    }
    return products.map(product -> productMapper.productToSummaryResponse(product));
  }

  // Lấy sản phẩm theo id
  public ProductDetailsResponse getProductById(Long id) {
    Product product =
        productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("product"));
    if (product.getIsDeleted()) {
      throw new ResourceNotFoundException("product");
    }
    if (!product.getVisible()) {
      throw new ResourceNotFoundException(AppMessage.of(MessageKey.PRIVATE_PRODUCT));
    }

    return productMapper.productToDetailsResponse(product);
  }
}
