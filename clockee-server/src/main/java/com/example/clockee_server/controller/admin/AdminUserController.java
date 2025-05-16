package com.example.clockee_server.controller.admin;


import com.example.clockee_server.config.ApplicationConstants;
import com.example.clockee_server.entity.Role;
import com.example.clockee_server.payload.PageResponse;
import com.example.clockee_server.payload.dto.UserDetailResponse;
import com.example.clockee_server.service.AdminUserService;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Page;



@RestController
@RequestMapping("/admin/users")
public class AdminUserController {
    @Autowired private AdminUserService adminUserService;

    // Lấy hết user có phân trang chưa có điều kiện specification
    @GetMapping
    ResponseEntity<PageResponse<UserDetailResponse>> getAllUsers(
            @RequestParam (defaultValue = ApplicationConstants.PAGE_NUMBER) int page,
            @RequestParam(defaultValue = ApplicationConstants.PAGE_SIZE) int size
    ){
        Page<UserDetailResponse> users = adminUserService.getAllUsers(page, size);

        return ResponseEntity.ok(new PageResponse<>(users));
    }

    // this function is to get user with id nè
    @GetMapping("/{id}")
    ResponseEntity<UserDetailResponse> getUserById(@PathVariable Long id){
        UserDetailResponse user = adminUserService.getUserById(id);
        return ResponseEntity.ok(user);
    }


    // this function is to get the user's role id, name, authorities timtimm
    @GetMapping("/{id}/roles")
    ResponseEntity<Set<Role>> getRoleById(@PathVariable Long id){
        Set<Role> roles = adminUserService.getRolesByUserId(id);
        return ResponseEntity.ok(roles);
    }
    
    @PatchMapping("/{id}/deleted")
    public ResponseEntity<String> updateUserdetedStatus(
        @PathVariable Long id,
        @RequestParam("isDeleted") Boolean isDeleted){
            adminUserService.upDateDeletedStatus(id, isDeleted);
        return ResponseEntity.noContent().build();
    }

}
