package com.example.clockee_server.service.user;

import com.example.clockee_server.entity.Product;
import com.example.clockee_server.exception.ResourceNotFoundException;
import com.example.clockee_server.file.FileStorageService;
import com.example.clockee_server.mapper.MapperUtil;
import com.example.clockee_server.mapper.ProductMapper;
import com.example.clockee_server.message.AppMessage;
import com.example.clockee_server.message.MessageKey;
import com.example.clockee_server.payload.PageResponse;
import com.example.clockee_server.payload.response.ProductDetailsResponse;
import com.example.clockee_server.payload.response.ProductSummaryResponse;
import com.example.clockee_server.repository.ProductRepository;
import com.example.clockee_server.specification.ProductSpecification;
import com.example.clockee_server.vo.BestSellerProductVo;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserProductService {
  @Autowired private ProductRepository productRepository;

  @Autowired private ProductMapper productMapper;
  @Autowired private FileStorageService fileStorageService;

  // Lấy danh sách sản phẩm của user có phân trang
  public Page<ProductSummaryResponse> getAllProducts(
      int page, int size, String name, String type, Double maxPrice, Long brandId, String sortBy) {
    Specification<Product> specification =
        Specification.where(ProductSpecification.searchByName(name))
            .and(ProductSpecification.searchByType(type))
            .and(ProductSpecification.searchByBrandId(brandId))
            .and(ProductSpecification.isNotDeleted())
            .and(ProductSpecification.sortBy(sortBy))
            .and(ProductSpecification.belowPrice(maxPrice));
    Pageable pageable = PageRequest.of(page, size);
    Page<Product> products = productRepository.findAll(specification, pageable);

    return products.map(product -> productMapper.productToProductSummary(product));
  }

  // Lấy sản phẩm theo id
  public ProductDetailsResponse getProductById(Long id) {
    Product product =
        productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("product"));
    if (product.getIsDeleted()) {
      throw new ResourceNotFoundException("product");
    }
    if (!product.getVisible()) {
      throw new ResourceNotFoundException(AppMessage.of(MessageKey.PRIVATE_PRODUCT));
    }

    return productMapper.productToProductDetails(product);
  }

  public PageResponse<ProductSummaryResponse> getLatestProducts(int page, int size) {
    Specification<Product> specification =
        ProductSpecification.isNotDeleted()
            .and(ProductSpecification.isVisiable())
            .and(ProductSpecification.latest());

    Pageable pageable = PageRequest.of(page, size);
    Page<Product> products = productRepository.findAll(specification, pageable);

    return MapperUtil.mapPageResponse(products, productMapper::productToProductSummary);
  }

  public List<ProductSummaryResponse> getBestSellingProducts(int page, int size) {
    List<BestSellerProductVo> products = productRepository.findBestSelling(size);
    return MapperUtil.mapList(
        products,
        (product) -> {
          ProductSummaryResponse productSummary =
              MapperUtil.mapObject(product, ProductSummaryResponse.class);
          productSummary.setImage(fileStorageService.readFileFromLocation(product.getImageUrl()));
          return productSummary;
        });
    // return MapperUtil.mapPageResponse(products,
    // productMapper::productToProductSummary);
  }
}
