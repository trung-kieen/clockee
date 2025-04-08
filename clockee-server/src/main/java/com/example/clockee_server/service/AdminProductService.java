package com.example.clockee_server.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.clockee_server.entity.Brand;
import com.example.clockee_server.entity.Product;
import com.example.clockee_server.exception.ResourceNotFoundException;
import com.example.clockee_server.file.FileStorageService;
import com.example.clockee_server.mapper.ProductMapper;
import com.example.clockee_server.message.AppMessage;
import com.example.clockee_server.message.MessageKey;
import com.example.clockee_server.payload.request.AdminProductRequest;
import com.example.clockee_server.payload.response.AdminProductResponse;
import com.example.clockee_server.repository.BrandRepository;
import com.example.clockee_server.repository.ProductRepository;

import jakarta.transaction.Transactional;

@Service
public class AdminProductService {
  @Autowired
  private ProductRepository productRepository;

  @Autowired
  private BrandRepository brandRepository;

  @Autowired
  private ModelMapper modelMapper;

  @Autowired
  private FileStorageService fileStorageService;

  @Autowired
  private ProductMapper productMapper;

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
    // product.setVersion(0L);
    Product savedProduct = productRepository.save(product);

    // return productMapper.productToAdminResponse(savedProduct);
    return productMapper.productToAdminResponse(savedProduct);
  }

  // // Lấy danh sách sản phẩm có phân trang
  // public List<AdminProductResponse> getAllProducts(int page, int size) {
  // Page<Product> products = productRepository.findAll(PageRequest.of(page,
  // size));
  // return products.stream()
  // .map(product -> modelMapper.map(product, AdminProductResponse.class))
  // .collect(Collectors.toList());
  // }

  // Lấy danh sách sản phẩm có phân trang
  public Page<AdminProductResponse> getAllProducts(int page, int size) {
    Pageable pageable = PageRequest.of(page, size);
    Page<Product> products = productRepository.findAll(pageable);

    if (products.isEmpty()) {
      return Page.empty();
    }

    return products.map(product -> productMapper.productToAdminResponse(product));
  }

  // Lấy chi tiết sản phẩm theo id
  public AdminProductResponse getProductById(Long id) {
    Product product = productRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException(AppMessage.of(MessageKey.RESOURCE_NOT_FOUND)));
    return productMapper.productToAdminResponse(product);
  }

  // Cập nhật thông tin sản phẩm
  @Transactional
  public AdminProductResponse updateProduct(Long id, AdminProductRequest request) {
    Product product = productRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Product does not exist!"));

    productMapper.mapToExistsProduct(request, product);

    Product updatedProduct = productRepository.save(product);

    return productMapper.productToAdminResponse(updatedProduct);
  }

  // Xoá sản phẩm
  @Transactional
  public AdminProductResponse deleteProduct(Long id) {
    Product product = productRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Product not found!"));

    productRepository.delete(product);
    return productMapper.productToAdminResponse(product);
  }

  /**
   * Upload image file from form request to system file
   * Product image url will be file path to this sysytem file
   */
  public void uploadProductImage(Long productId, MultipartFile file) {
    Product product = productRepository.findById(productId)
        .orElseThrow(() -> new ResourceNotFoundException("product"));
    String productImageFilePath = fileStorageService.saveFile(file);
    product.setImageUrl(productImageFilePath);
    productRepository.save(product);

  }
}
