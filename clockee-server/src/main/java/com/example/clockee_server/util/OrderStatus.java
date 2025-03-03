package com.example.clockee_server.util;

public enum OrderStatus {
    PENDING("Đơn hàng chưa được giải quyết"),
    PROCESSING("Đơn hàng đang được xử lý"),
    SHIPPED("Đơn hàng đã được giao"),
    COMPLETED("Đơn hàng đã hoàn thành");

    private final String name;

    OrderStatus(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    @Override
    public String toString() {
        return name;
    }
}
