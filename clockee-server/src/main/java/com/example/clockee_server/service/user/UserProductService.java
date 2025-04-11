package com.example.clockee_server.service.user;

import com.example.clockee_server.entity.Product;
import com.example.clockee_server.payload.response.user.UserProductResponse;
import com.example.clockee_server.repository.ProductRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class UserProductService {
  @Autowired ProductRepository productRepository;

  @Autowired ModelMapper modelMapper;

  // Lấy danh sách sản phẩm của user có phân trang
  public Page<UserProductResponse> getAllProducts(int page, int size) {
    Pageable pageable = PageRequest.of(page, size);
    Page<Product> products = productRepository.getAllActiveProducts(pageable);

    if (products.isEmpty()) {
      return Page.empty();
    }

    return products.map(product -> modelMapper.map(product, UserProductResponse.class));
  }

  // Lấy sản phẩm theo id
  public UserProductResponse getProductByID(Long id) {
    Product product =
        productRepository
            .findById(id)
            .orElseThrow(() -> new RuntimeException("Product does not exitst!"));
    return modelMapper.map(product, UserProductResponse.class);
  }
}
