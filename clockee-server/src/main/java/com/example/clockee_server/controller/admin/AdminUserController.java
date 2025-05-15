package com.example.clockee_server.controller.admin;


import com.example.clockee_server.config.ApplicationConstants;
import com.example.clockee_server.entity.User;
import com.example.clockee_server.mapper.UserMapper;
import com.example.clockee_server.payload.dto.UserDetailResponse;
import com.example.clockee_server.repository.UserRepository;
import com.example.clockee_server.service.AdminUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;



@RestController
@RequestMapping("/admin/users")
public class AdminUserController {
    @Autowired private AdminUserService adminUserService;

    // Lấy hết user có phân trang chưa có điều kiện specification
    @GetMapping
    ResponseEntity<Page<UserDetailResponse>> getAllUsers(
            @RequestParam (defaultValue = ApplicationConstants.PAGE_NUMBER) int page,
            @RequestParam(defaultValue = ApplicationConstants.PAGE_SIZE) int size
    ){
        Page<UserDetailResponse> users = adminUserService.getAllUsers(page, size);

        return ResponseEntity.ok(users);
    }

}
