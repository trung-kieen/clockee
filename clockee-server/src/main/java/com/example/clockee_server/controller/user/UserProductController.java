package com.example.clockee_server.controller.user;

import com.example.clockee_server.config.ApplicationConstants;
import com.example.clockee_server.payload.response.ProductDetailsResponse;
import com.example.clockee_server.payload.response.user.ProductSummaryResponse;
import com.example.clockee_server.service.user.UserProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user/products")
@RequiredArgsConstructor
public class UserProductController {

  @Autowired UserProductService userProductService;

  // Api có phân trang (trả về theo từng trang)
  @GetMapping
  public ResponseEntity<Page<ProductSummaryResponse>> getAllProducts(
      @RequestParam(defaultValue = ApplicationConstants.PAGE_NUMBER) int page, @RequestParam(defaultValue = ApplicationConstants.PAGE_SIZE) int size) {

    Page<ProductSummaryResponse> products = userProductService.getAllProducts(page, size);
    return ResponseEntity.ok(products);
  }

  // Api lấy sản phẩm theo id
  @GetMapping("/{id}")
  public ResponseEntity<ProductDetailsResponse> getProductById(@PathVariable Long id) {
    ProductDetailsResponse product = userProductService.getProductById(id);
    return ResponseEntity.ok(product);
  }
}
