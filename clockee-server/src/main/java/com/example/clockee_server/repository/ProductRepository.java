package com.example.clockee_server.repository;

import com.example.clockee_server.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;



@Repository
public interface ProductRepository extends JpaRepository<Product, Long> { // để kiểu của khóa chính là Long
    List<Product> findAllByOrderByStockDesc(); // Sắp xếp tồn kho giảm dần
    List<Product> findAllByOrderByStockAsc();  // Sắp xếp tồn kho tăng dần

    @Query("SELECT p FROM Product p WHERE p.isActive = TRUE")
    Page<Product> getAllActiveProducts(Pageable pageable);
}

