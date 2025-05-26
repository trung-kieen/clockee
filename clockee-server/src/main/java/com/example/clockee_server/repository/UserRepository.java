package com.example.clockee_server.repository;

import com.example.clockee_server.entity.User;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {
  Optional<User> findByEmail(String email);

  boolean existsByEmail(String email);



  @Query(
      value =
          "SELECT  u FROM User u "
              + " JOIN FETCH u.verificationCode "
              + " WHERE u.userId = :userId")
  Optional<User> findByIdWithVerificationCode(@Param("userId") Long userId);

  @Query("SELECT u FROM User u LEFT JOIN FETCH u.roles WHERE u.userId = :userId")
    Optional<User> findByIdWithRoles(@Param("userId") Long userId);

}
