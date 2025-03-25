package com.example.clockee_server.service.user;

import com.example.clockee_server.payload.response.user.UserProductResponse;
import com.example.clockee_server.repository.ProductRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserProductService {
    @Autowired
    ProductRepository productRepository;

    @Autowired
    ModelMapper modelMapper;

    public List<UserProductResponse> getAllProducts() {
        return productRepository.getAllActiveProducts()
                .stream()
                .map(product -> modelMapper.map(product, UserProductResponse.class)) // Sửa lỗi dấu ngoặc
                .collect(Collectors.toList());
    }

}
