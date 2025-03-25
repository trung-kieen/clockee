package com.example.clockee_server.repository;

import com.example.clockee_server.entity.Brand;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BrandRepository extends JpaRepository <Brand, Long> {
    Optional<Brand> findById(Long id);
    Page<Brand> findByIsDeletedFalse(Pageable pageable);

}
