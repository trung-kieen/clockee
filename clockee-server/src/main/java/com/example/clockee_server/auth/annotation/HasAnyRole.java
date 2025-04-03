package com.example.clockee_server.auth.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.springframework.security.access.prepost.PreAuthorize;

// @HasAnyRole(roles = { "'USER'", "'ADMIN'" })
// public Account readAccount(Long id) {
// // ... is only returned if the `Account` belongs to the logged in user

@Target({ ElementType.METHOD, ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
@PreAuthorize("hasAnyRole({roles})")
public @interface HasAnyRole {
  String[] roles();
}
