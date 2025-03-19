package com.example.clockee_server.repository;

import com.example.clockee_server.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findAllByOrderByStockDesc(); // sap xep giam dan
    List<Product> findAllByOrderByStockAsc(); // sap xep tang dan
    Optional<Product> findById(Long id); // Định nghĩa phương thức tìm theo ID - mặc định id là integer
    void deleteById(Long id);
    boolean existsById(Long id);
}
