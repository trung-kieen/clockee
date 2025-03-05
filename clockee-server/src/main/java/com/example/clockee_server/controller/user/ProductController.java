package com.example.clockee_server.controller.user;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

/**
 * ProductController
 */
@RestController
@RequestMapping("/user/products/")
@RequiredArgsConstructor
public class ProductController {

  @GetMapping("/{id}")
  public ResponseEntity<?> getDetails(@PathVariable Long id ) {
    // TODO:
    return null;
  }


  // TODO: <Optional> Search with Filter, Sort, Newest product

}
