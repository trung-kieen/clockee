package com.example.clockee_server.controller.user;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.clockee_server.payload.response.user.UserProductResponse;
import com.example.clockee_server.service.user.UserProductService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/user/products")
@RequiredArgsConstructor
public class UserProductController {

    @Autowired
    UserProductService userProductService;

    // Api có phân trang (trả về theo từng trang)
    @GetMapping
    public ResponseEntity<Page<UserProductResponse>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size){

        Page<UserProductResponse> products = userProductService.getAllProducts(page, size);
        return ResponseEntity.ok(products);
    }

    // Api lấy sản phẩm theo id
    @GetMapping("/{id}")
    public ResponseEntity<UserProductResponse> getProductById(@PathVariable Long id){
        UserProductResponse product = userProductService.getProductByID(id);
        return ResponseEntity.ok(product);
    }

}
