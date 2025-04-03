package com.example.clockee_server.exception;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.transaction.TransactionSystemException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.example.clockee_server.message.AppMessage;
import com.example.clockee_server.message.MessageKey;

/**
 * ExceptionHandler
 * Extend ResponseEntityExceptionHandler for returning a {@link ResponseEntity} with RFC 9457 by convention
 * Handle specific api error response for application runtime exception
 * Apply to class that mark with @Controller annotation
 *
 * Example : program raise ResourceNotFoundException instead of return htttp status 500 (server error)
 * exception handler specify error is 404 (not found)
 *
 * Normalize custom error response is {@link HttpErrorResponse}
 */
@ControllerAdvice
public class ExceptionHandler extends ResponseEntityExceptionHandler {
  private static final Logger log = org.slf4j.LoggerFactory.getLogger(ExceptionHandler.class);


  /**
   * Handle cac loi xay ra trong qua trinh validate tu server
   * nhu @NotBlank, @Email, @Size
   * Xem them: spring-boot-starter-validation
   */
  @Override
  public ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
      HttpHeaders headers, HttpStatusCode status, WebRequest request) {
    Map<String, String> errors = new HashMap<>();
    List<String> generalErrors = new ArrayList<>();

    ex.getBindingResult().getAllErrors().forEach((error) -> {
      if (error instanceof FieldError fieldErr) {
        String fieldName = fieldErr.getField();
        String errorMessage = fieldErr.getDefaultMessage();
        errors.put(fieldName, errorMessage);
      }else {
        generalErrors.add(error.getDefaultMessage());
      }
    });
    HttpErrorResponse response = HttpErrorResponse.of(AppMessage.of(MessageKey.UNPROCESSABLE_ENTITY), 422, errors, generalErrors);

    return new ResponseEntity<>(response, HttpStatus.UNPROCESSABLE_ENTITY);
  }

  @org.springframework.web.bind.annotation.ExceptionHandler(ApiException.class)
  public ResponseEntity<HttpErrorResponse> handleException(ApiException e) {
    log.info("Handling ApiException: {}", e.getMessage());
    var response = HttpErrorResponse.of(e.getMessage(), e.getStatus(), null, Collections.singletonList(AppMessage.of(MessageKey.SERVER_ERROR)));
    return new ResponseEntity<>(response, HttpStatus.valueOf(e.getStatus()));
  }

  @org.springframework.web.bind.annotation.ExceptionHandler(BadCredentialsException.class)
  public ResponseEntity<HttpErrorResponse> handleException(BadCredentialsException e) {
    log.info("Handling BadCredentialsException: {}", e.getMessage());
    HttpErrorResponse response = HttpErrorResponse.of(e.getMessage(), 401, null, null);
    return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
  }

  @org.springframework.web.bind.annotation.ExceptionHandler(AuthorizationDeniedException.class)
  public ResponseEntity<HttpErrorResponse> handleException(AuthorizationDeniedException e) {
    log.info("Handling AuthorizationDeniedException: {}", e.getMessage());
    HttpErrorResponse response = HttpErrorResponse.of(e.getMessage(), 403, null, null);
    return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
  }



  /*
   * Handler for data constraint violent => Roll back before transaction
   */
  @org.springframework.web.bind.annotation.ExceptionHandler(value = TransactionSystemException.class)
  public ResponseEntity<HttpErrorResponse> handleTransactionRollBack(TransactionSystemException e) {
    log.info("Handling AuthorizationDeniedException: {}", e.getMessage());
    HttpErrorResponse response = HttpErrorResponse.of(e.getMessage(), 400, null, null);
    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  @org.springframework.web.bind.annotation.ExceptionHandler(value = ResourceNotFoundException.class)
  public ResponseEntity<HttpErrorResponse> handleResourceNotFound(ResourceNotFoundException e) {
    HttpErrorResponse response = HttpErrorResponse.of(e.getMessage(), 404, null, null);
    return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
  }


  /**
   * Handle cac loi chung chung khong ro nguyen nhan nhu {@link RuntimeException}
   */
  @org.springframework.web.bind.annotation.ExceptionHandler(Exception.class)
  public ResponseEntity<HttpErrorResponse> handleException(Exception e) {
    log.error("Unhandled exception", e);
    HttpErrorResponse response = HttpErrorResponse.of(AppMessage.of(MessageKey.SERVER_ERROR), 500);
    return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
  }


}
