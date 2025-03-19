package com.example.clockee_server.service;

import com.example.clockee_server.entity.Brand;
import com.example.clockee_server.entity.Product;
import com.example.clockee_server.payload.request.AdminProductRequest;
import com.example.clockee_server.payload.response.AdminProductResponse;
import com.example.clockee_server.repository.BrandRepository;
import com.example.clockee_server.repository.ProductRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Page;
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

//    private AdminProductResponse convertToAdminProductResponse(AdminProductRequest request){
//        return modelMapper.map(request, AdminProductResponse.class);
//    }

    // Thêm sản phẩm
    public AdminProductResponse createProdcuct(AdminProductRequest request){
        Product product = modelMapper.map(request, Product.class);

        // ✅ Lấy Brand từ DB và gán vào Product
        Brand brand = brandRepository.findById(request.getBrandId())
                .orElseThrow(() -> new RuntimeException("Brand not found!"));
        product.setBrand(brand);

        product.setStock(0L);
        Product savedProduct = productRepository.save(product);
        return modelMapper.map(savedProduct, AdminProductResponse.class);
    }


    // Lấy danh sách sản phẩm có phân trang - get product list that has paging
    public List<AdminProductResponse> getAllProducts(int page, int size){
        Page<Product> products = productRepository.findAll(PageRequest.of(page, size));
        return products.stream()
                .map(product -> modelMapper.map(product, AdminProductResponse.class))
                .collect(Collectors.toList());
    }

    // Lấy chi tiết sản phẩm theo id - get product info by id
    public AdminProductResponse getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found!"));
        return modelMapper.map(product, AdminProductResponse.class);
    }

    // Cập nhật thông tin sản phẩm - update product info
    public AdminProductResponse updateProduct(Long id, AdminProductRequest request){
        Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product does not exist! "));
        modelMapper.map(request, product); // copy info from request to product instance
        Product updatedProduct = productRepository.save(product);
        return modelMapper.map(updatedProduct, AdminProductResponse.class);
    }

    // xoá sản phẩm - product deletion
    public AdminProductResponse deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Sản phẩm không tồn tại!");
        }
        productRepository.deleteById(id);
        return null;
    }

}
