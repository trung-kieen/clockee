package com.example.clockee_server.payload.dto;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SupplierDTO {
    private Long supplierId;
    private String name;
    private String address;
    private String phone;
    private String email;
}
