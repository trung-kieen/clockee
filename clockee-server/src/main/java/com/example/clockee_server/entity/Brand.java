package com.example.clockee_server.entity;

import com.example.clockee_server.util.Client;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "brands")
@Client
public class Brand {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "brand_id")
    private Long brandId;

    @Column(length = 255, nullable = false)
    private String name;

    @Column(name = "is_deleted")
    private Boolean isDeleted;
}
