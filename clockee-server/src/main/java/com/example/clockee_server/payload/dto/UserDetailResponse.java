package com.example.clockee_server.payload.dto;

import com.example.clockee_server.entity.Role;
import com.example.clockee_server.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserDetailResponse {
    private Long userId;
    private String email;
    private String name;
    private String phone;
    private Boolean isDeleted;
    private String address;
    private List<String> role;

    public UserDetailResponse(User user){
        this.userId = user.getUserId();;
        this.email = user.getEmail();
        this.name = user.getName();
        this.phone = user.getPhone();
        this.address = user.getAddress();

        this.role = user.getRoles().stream()
                .map(role -> role.getRoleName().getName()) // lấy tên từng role
                .collect(Collectors.toList());
    }

}
