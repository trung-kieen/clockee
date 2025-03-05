package com.example.clockee_server.controller.admin;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.clockee_server.payload.PageResponse;
import com.example.clockee_server.payload.request.ProductDTO;
import com.example.clockee_server.payload.response.AdminProductDTO;

import lombok.RequiredArgsConstructor;

/**
 * ProductController
 * // TODO: Vi
 */
@RestController
@RequestMapping("/admin/products/")
@RequiredArgsConstructor
public class ProductController {


  // TODO: Create service layer for this class

  @GetMapping
  public ResponseEntity<PageResponse<AdminProductDTO>> getAll() {
    // TODO:
    return null;
  }


  /**
   * Admin will access product detail page for edit product information
   */
  @GetMapping("/{id}")
  public ResponseEntity<?> getDetails(@PathVariable Long id ) {
    // TODO:
    return null;
  }

  @PutMapping
  public ResponseEntity<?> create(ProductDTO dto ){
    // Checkout band_id is exists before update or else ResourceNotFoundException
    return null;
  }

  @PutMapping("{id}")
  public ResponseEntity<?> update(@PathVariable Long id,  ProductDTO dto){
    // Checkout band_id is exists before update or else ResourceNotFoundException
    return null;
  }

  /**
   * Only allow to delete only for none foreign key product
   */
  @DeleteMapping("/{id}")
  public ResponseEntity<?> delete(@PathVariable Long id){
    return null;
  }

}
