package com.example.clockee_server.service;

import com.example.clockee_server.entity.Brand;
import com.example.clockee_server.entity.Product;
import com.example.clockee_server.payload.request.AdminProductRequest;
import com.example.clockee_server.payload.response.AdminProductResponse;
import com.example.clockee_server.repository.BrandRepository;
import com.example.clockee_server.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private ModelMapper modelMapper;

    // Thêm sản phẩm
    @Transactional
    public AdminProductResponse createProduct(AdminProductRequest request) {
        Product product = modelMapper.map(request, Product.class);

        product.setProductId(null);

        // Lấy Brand từ DB và gán vào Product
        Brand brand = brandRepository.findById(Long.valueOf(request.getBrandId()))
                .orElseThrow(() -> new RuntimeException("Brand not found!"));
        product.setBrand(brand);

        product.setStock(0L);
//        product.setVersion(0L);
        Product savedProduct = productRepository.save(product);
        return modelMapper.map(savedProduct, AdminProductResponse.class);
    }

    // Lấy danh sách sản phẩm có phân trang
    public List<AdminProductResponse> getAllProducts(int page, int size) {
        Page<Product> products = productRepository.findAll(PageRequest.of(page, size));
        return products.stream()
                .map(product -> modelMapper.map(product, AdminProductResponse.class))
                .collect(Collectors.toList());
    }

    // Lấy chi tiết sản phẩm theo id
    public AdminProductResponse getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found!"));
        return modelMapper.map(product, AdminProductResponse.class);
    }


    // Cập nhật thông tin sản phẩm
    @Transactional
    public AdminProductResponse updateProduct(Long id, AdminProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product does not exist!"));

        // Log ID trước khi map
        System.out.println("Before mapping: " + product.getProductId());

        // Ánh xạ nhưng bỏ qua productId
        modelMapper.typeMap(AdminProductRequest.class, Product.class)
                .addMappings(mapper -> mapper.skip(Product::setProductId))
                .map(request, product);  // Áp dụng ánh xạ

        // Log ID sau khi map
        System.out.println("After mapping: " + product.getProductId());

        Product updatedProduct = productRepository.save(product);

        return modelMapper.map(updatedProduct, AdminProductResponse.class);
    }


    // Xoá sản phẩm
    @Transactional
    public AdminProductResponse deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found!"));

        productRepository.delete(product);
        return modelMapper.map(product, AdminProductResponse.class); // Trả về thông tin sản phẩm đã xoá
    }
}
