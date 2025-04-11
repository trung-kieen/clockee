package com.example.clockee_server.service;

import com.example.clockee_server.entity.Product;
import com.example.clockee_server.entity.Purchase;
import com.example.clockee_server.entity.Supplier;
import com.example.clockee_server.repository.ProductRepository;
import com.example.clockee_server.repository.PurchaseRepository;
import com.example.clockee_server.repository.SupplierRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PurchaseService {
  private final ProductRepository productRepository;
  private final SupplierRepository supplierRepository;
  private final PurchaseRepository purchaseRepository;

  @Transactional
  public Purchase addPurchase(Long productId, Long supplierId, Long quantity, Double price) {
    Product product =
        productRepository
            .findById(productId)
            .orElseThrow(() -> new RuntimeException("Product not found"));
    Supplier supplier =
        supplierRepository
            .findById(supplierId)
            .orElseThrow(() -> new RuntimeException("Supplier not found"));

    Purchase purchase =
        Purchase.builder()
            .product(product)
            .supplier(supplier)
            .quantity(quantity)
            .price(price)
            .totalPrice(price * quantity)
            .build();

    purchaseRepository.save(purchase);

    product.setStock(product.getStock() + quantity);
    productRepository.save(product);

    return purchase;
  }

  public List<Purchase> getPurchaseHistory() {
    return purchaseRepository.findAll();
  }
}
