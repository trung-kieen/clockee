package com.example.clockee_server.controller.admin;

import com.example.clockee_server.entity.Purchase;
import com.example.clockee_server.service.PurchaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/purchase")
@RequiredArgsConstructor
public class AdminPurchaseController {
    private final PurchaseService purchaseService;

    @GetMapping("/history")
    public ResponseEntity<List<Purchase>> getPurchaseHistory() {
        List<Purchase> purchaseHistory = purchaseService.getPurchaseHistory();

        return ResponseEntity.ok(purchaseHistory);
    }

    @PostMapping("/add")
    public ResponseEntity<Purchase> addPurchase(@RequestParam Long productId, @RequestParam Long supplierId, @RequestParam Long quantity, @RequestParam Double price) {
        Purchase purchase = purchaseService.addPurchase(productId, supplierId, quantity, price);

        return ResponseEntity.ok(purchase);
    }

}
