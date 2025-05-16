package com.example.clockee_server.service;


import com.example.clockee_server.entity.Role;
import com.example.clockee_server.entity.User;
import com.example.clockee_server.exception.ResourceNotFoundException;
import com.example.clockee_server.mapper.UserMapper;
import com.example.clockee_server.payload.dto.UserDetailResponse;
import com.example.clockee_server.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import java.util.Set;

import javax.management.RuntimeErrorException;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@Service
@RequiredArgsConstructor
public class AdminUserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired private UserMapper userMapper;

    public Page<UserDetailResponse> getAllUsers(int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        Page<User> users = userRepository.findAll(pageable);

        if(users.isEmpty()){
            return Page.empty();
        }

        return users.map(user -> userMapper.userToUserDetailResponse(user));
    }

    public UserDetailResponse getUserById(Long id){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return userMapper.userToUserDetailResponse(user);
    }

    public Set<Role> getRolesByUserId(Long userId){
        User user = userRepository.findByIdWithRoles(userId)
                    .orElseThrow(()-> new ResourceNotFoundException("User not found"));
        return user.getRoles();
    }
    
    public void upDateDeletedStatus(Long id, boolean isDeleted){
        User user = userRepository.findById(id)
            .orElseThrow(()-> new ResourceNotFoundException("User not found"));
        
            user.setIsDeleted(isDeleted);

            userRepository.save(user);
    }

}
