package com.example.clockee_server.service;


import com.example.clockee_server.entity.User;
import com.example.clockee_server.mapper.UserMapper;
import com.example.clockee_server.payload.dto.UserDetailResponse;
import com.example.clockee_server.repository.UserRepository;
import lombok.RequiredArgsConstructor;
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

    @Autowired private ModelMapper modelMapper;

    @Autowired private UserMapper userMapper;

    public Page<UserDetailResponse> getAllUsers(int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        Page<User> users = userRepository.findAll(pageable);

        if(users.isEmpty()){
            return Page.empty();
        }

        return users.map(user -> userMapper.userToUserDetailResponse(user));
    }

}
