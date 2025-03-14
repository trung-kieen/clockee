package com.example.clockee_server.dto;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SupplierDTO {
    private Long SupplierId;
    private String name;
    private String address;
    private String phone;
    private String email;
}
