package com.example.clockee_server.entity;

import com.example.clockee_server.util.Client;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "purchases")
@Client
public class Purchase {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "purchase_id")
  private Long purchaseId;

  @ManyToOne
  @JoinColumn(name = "product_id", nullable = false)
  private Product product;

  @ManyToOne
  @JoinColumn(name = "supplier_id", nullable = false)
  private Supplier supplier;

  @Column(precision = 10, nullable = false)
  private Double price;

  @Column(nullable = false)
  private Long quantity;

  @Column(name = "total_price", precision = 10, nullable = false)
  private Double totalPrice;

  @Column(name = "created_at", updatable = false, nullable = false)
  private LocalDateTime createdAt;
}
