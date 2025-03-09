package com.example.clockee_server.entity;

import java.util.Set;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name="roles")
public class Role implements GrantedAuthority {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "role_id")
  private Long roleId;

  @Enumerated(EnumType.STRING)
  @Column(name = "role_name", unique = true)
  private RoleName roleName;

  @ManyToMany(mappedBy = "roles")
  Set<User> users;

  @Override
  public String getAuthority() {
    return roleName.getName();
  }

}
