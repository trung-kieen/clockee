package com.example.clockee_server.service.user;

import com.example.clockee_server.entity.Order;
import com.example.clockee_server.payload.response.PaymentResponse;

public interface PaymentService {

  PaymentResponse createPayment(Order order) throws Exception;
}
