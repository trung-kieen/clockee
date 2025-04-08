package com.example.clockee_server.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.clockee_server.auth.annotation.HasRole;
import com.example.clockee_server.payload.dto.SupplierDTO;
import com.example.clockee_server.service.SupplierService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/suppliers")
@RequiredArgsConstructor
public class AdminSupplierController {
  @Autowired
  private SupplierService supplierService;

  @HasRole(value = "INVENTORY_MANAGER")
  // @PreAuthorize("hasRole('INVENTORY_MANAGER')")
  @GetMapping
  // @RolesAllowed("INVENTORY_MANAGER")
  public ResponseEntity<Page<SupplierDTO>> getAllSuppliers(Pageable pageable) {
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
