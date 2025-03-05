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
import com.example.clockee_server.payload.response.BrandDTO;

import lombok.RequiredArgsConstructor;

/**
 * ProductController
 * // TODO: Duong
 */
@RestController
@RequestMapping("/admin/brands/")
@RequiredArgsConstructor
public class BrandController {


  // TODO: Create service layer for this class

  @GetMapping
  public ResponseEntity<PageResponse<BrandDTO>> getAll() {
    // TODO:
    return null;
  }


  /**
   * Admin will access product detail page for edit product information
   */
  @GetMapping("/{id}")
  public ResponseEntity<?> get(@PathVariable Long id ) {
    // TODO:
    return null;
  }

  @PutMapping
  public ResponseEntity<?> create(BrandDTO dto ){
    return null;
  }

  @PutMapping("{id}")
  public ResponseEntity<?> update(@PathVariable Long id,  BrandDTO dto){
    // Checkout band_id is exists before update or else ResourceNotFoundException
    return null;
  }

  /**
   * Use is_deleted
   */
  @DeleteMapping("/{id}")
  public ResponseEntity<?> delete(@PathVariable Long id){
    return null;
  }

}
