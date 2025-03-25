package com.example.clockee_server.controller.admin;

import com.example.clockee_server.dto.BrandDTO;
import com.example.clockee_server.service.BrandService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/brands")
public class BrandController {
    @Autowired
    private BrandService brandService;

    @GetMapping
    public ResponseEntity<Page<BrandDTO>> getAllBrands(Pageable pageable) {
        return ResponseEntity.ok(brandService.getAllBrands(pageable));
    }

    @PostMapping
    public ResponseEntity<BrandDTO> addBrand(@RequestBody BrandDTO dto) {
        return ResponseEntity.ok(brandService.addBrand(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BrandDTO> updateBrand(@PathVariable Long id, @RequestBody BrandDTO dto) {
        BrandDTO brandDTO = brandService.updateBrand(id, dto);
        return brandDTO != null ? ResponseEntity.ok(brandDTO) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBrand(@PathVariable Long id) {
        brandService.deleteBrand(id);
        return ResponseEntity.noContent().build();
    }
}
