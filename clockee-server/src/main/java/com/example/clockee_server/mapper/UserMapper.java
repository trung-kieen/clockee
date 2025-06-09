package com.example.clockee_server.mapper;

import com.example.clockee_server.entity.User;
import com.example.clockee_server.payload.dto.UserDetailResponse;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserMapper {
  private final ModelMapper mapper;

  public UserDetailResponse userToUserDetailResponse(User user) {
    return MapperUtil.mapObject(user, UserDetailResponse.class);
  }
}
