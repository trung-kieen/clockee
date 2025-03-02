package com.example.clockee_server.validatetor;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;

/**
 * PasswordMatch
 */

@Constraint(validatedBy = PasswordMatchValidator.class)
@Target({java.lang.annotation.ElementType.TYPE})
@Retention(java.lang.annotation.RetentionPolicy.RUNTIME)
@Documented
public @interface  PasswordMatch {
  String message() default "Password do not match";
  Class<?>[] groups() default { };
  Class<?>[] payload() default { };

  String passwordField();
  String passwordConfirmationFieldName();

}
