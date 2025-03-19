package com.example.clockee_server.payload.response;


import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AdminProductResponse {
    private Integer productId;
    private String name;
    private String description;
    private Double actualPrice;
    private Double sellPrice;
    private String type;
    private Integer stock;
    private Boolean isActive;
    private Boolean visible;
}
