package com.example.clockee_server.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.clockee_server.dto.SupplierDTO;
import com.example.clockee_server.service.SupplierService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/suppliers")
@RequiredArgsConstructor
public class SupplierController {
  @Autowired
  private SupplierService supplierService;

  @GetMapping
  public ResponseEntity<Page<SupplierDTO>> getAllSuppliers(
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "5") int size) {
    Pageable pageable = PageRequest.of(page, size);
    return ResponseEntity.ok(supplierService.getAllSuppliers(pageable));
  }

  @PostMapping
  public ResponseEntity<SupplierDTO> addSupplier(@RequestBody SupplierDTO dto) {
    return ResponseEntity.ok(supplierService.addSupplier(dto));
  }

  @PutMapping("/{id}")
  public ResponseEntity<SupplierDTO> updateSupplier(@PathVariable Long id, @RequestBody SupplierDTO dto) {
    return ResponseEntity.ok(supplierService.updateSupplier(id, dto));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteSupplier(@PathVariable Long id) {
    supplierService.deletedSupplier(id);
    return ResponseEntity.noContent().build();
  }
}
