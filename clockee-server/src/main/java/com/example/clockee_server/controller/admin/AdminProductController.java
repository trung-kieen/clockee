package com.example.clockee_server.controller.admin;

import com.example.clockee_server.payload.request.AdminProductRequest;
import com.example.clockee_server.payload.response.AdminProductResponse;
import com.example.clockee_server.service.AdminProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/admin/products")
public class AdminProductController {

    @Autowired
    AdminProductService adminProductService;

    @PostMapping
    public AdminProductResponse createProduct(@RequestBody AdminProductRequest request){
        return adminProductService.createProdcuct(request);
    }

    @GetMapping
    public List<AdminProductResponse> getAllProduct(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        return adminProductService.getAllProducts(page, size);
    }

    @GetMapping("/{id}")
    public AdminProductResponse getProductById(@PathVariable Long id){
        return adminProductService.getProductById(id);
    }

    @PutMapping("/{id}")
    public AdminProductResponse updateProduct(@PathVariable Long id, @RequestBody AdminProductRequest request){
        return adminProductService.updateProduct(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<AdminProductResponse> deleteProduct(@PathVariable Long id) {
        AdminProductResponse deletedProduct = adminProductService.deleteProduct(id);
        return ResponseEntity.ok(deletedProduct);
    }
}
