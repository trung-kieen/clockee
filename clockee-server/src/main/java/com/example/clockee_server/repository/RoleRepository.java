package com.example.clockee_server.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.clockee_server.entity.Role;
import com.example.clockee_server.entity.RoleName;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByRoleName(RoleName rolename);

}
