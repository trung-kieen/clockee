package com.example.clockee_server.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BrandDTO {
    private Long brandId;
    private String name;
}
