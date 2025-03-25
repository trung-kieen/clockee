package com.example.clockee_server.entity;

import com.example.clockee_server.util.Client;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "suppliers")
@Client
public class Supplier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "supplier_id")
    private Long supplierId;

    @Column(length = 255, nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String address;

    @Column(length = 11)
    private String phone;

    @Column(length = 255)
    private String email;

    @Column(name = "is_deleted")
    private Boolean isDeleted;
}
