package com.example.clockee_server.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.example.clockee_server.entity.Brand;

@Repository
public interface BrandRepository extends JpaRepository <Brand, Long>, JpaSpecificationExecutor<Brand> {
    Optional<Brand> findById(Long id);
    Page<Brand> findAll(Specification<Brand> spec, Pageable pageable);

}
