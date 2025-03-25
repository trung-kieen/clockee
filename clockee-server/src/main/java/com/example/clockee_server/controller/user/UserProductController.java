package com.example.clockee_server.controller.user;
import com.example.clockee_server.payload.response.user.UserProductResponse;
import com.example.clockee_server.service.user.UserProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user/products")
@RequiredArgsConstructor
public class UserProductController {

    @Autowired
    UserProductService userProductService;

    @GetMapping
    public ResponseEntity<List<UserProductResponse>> getAllProducts(){
        List<UserProductResponse> products = userProductService.getAllProducts();
        if(products.isEmpty()){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build(); // able to return http status code
        }
        return ResponseEntity.ok(products);
    }

}
