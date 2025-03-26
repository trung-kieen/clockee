package com.example.clockee_server.entity;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
// TODO: Duong - use pural noun for all entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long productId;

    @Column(nullable = false, length= 255)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "image_url", length = 255)
    private String imageUrl;

    @Column(name = "actual_price", precision = 10, nullable = false)
    private Double actualPrice;

    @Column(name = "sell_price", precision = 10, nullable = false)
    private Double sellPrice;

    @Column(length = 50)
    private String type;

    // TODO: Duong - default = 0
    @Column(nullable = false, columnDefinition = "BIGINT DEFAULT 0")
    private Long stock;

    @ManyToOne
    @JoinColumn(name = "brand_id", nullable = false)
    private Brand brand;

    @Column(name = "is_active")
    private Boolean isActive;
    private Boolean visible;
}
