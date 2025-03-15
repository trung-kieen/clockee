package com.example.clockee_server.repository;

import com.example.clockee_server.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findAllByOrderByStockDesc(); // Sắp xếp tồn kho giảm dần
    List<Product> findAllByOrderByStockAsc();  // Sắp xếp tồn kho tăng dần
}
