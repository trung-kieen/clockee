package com.example.clockee_server.service;

import com.example.clockee_server.dto.BrandDTO;
import com.example.clockee_server.entity.Brand;
import com.example.clockee_server.repository.BrandRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BrandService {
    @Autowired
    private BrandRepository brandRepository;

    public Page<BrandDTO> getAllBrands(Pageable pageable) {
        return brandRepository.findByIsDeletedFalse(pageable).map(
                brand -> new BrandDTO(brand.getBrandId(), brand.getName())
        );
    }

    public BrandDTO addBrand(BrandDTO dto) {
        Brand brand = Brand.builder()
                .name(dto.getName())
                .isDeleted(false)
                .build();
        return new BrandDTO(brandRepository.save(brand).getBrandId(), brand.getName());
    }

    public BrandDTO updateBrand(Long id, BrandDTO dto) {
        Optional<Brand> brandOptional = brandRepository.findById(id);
        if (brandOptional.isPresent()) {
            Brand brand = brandOptional.get();
            brand.setName(dto.getName());
            brandRepository.save(brand);
            return new BrandDTO(brand.getBrandId(), brand.getName());
        }
        throw new RuntimeException("Brand not found");
    }

    public void deleteBrand(Long id) {
        Optional<Brand> brandOptional = brandRepository.findById(id);
        if (brandOptional.isPresent()) {
            Brand brand  = brandOptional.get();
            brand.setIsDeleted(true);
            brandRepository.save(brand);
        }
    }
}
