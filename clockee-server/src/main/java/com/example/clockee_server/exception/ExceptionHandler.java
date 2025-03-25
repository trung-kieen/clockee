package com.example.clockee_server.exception;

import java.util.ArrayList;
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

/**
 * ExceptionHandler
 *
 * Quy uoc tra ve phan hoi (response) co cac ngoai le (exception) cu the
 * Moi exception can co status the hien ngu nghia cua loi tra ve cho phia client
 *
 * Ap dung cho loi tra ve trong cac lop thuoc @Controller
 *
 * VD: khi chuong trinh gap loi ResourceNotFoundException thay vi tra ve htttp status 500 (loi server)
 * thi tra ve status 404 (khong tim thay tai nguyen) de cu the ngu nghia
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
  protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
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
    HttpErrorResponse response = HttpErrorResponse.of("Unprocessable entity", 422, errors, generalErrors);

    return new ResponseEntity<>(response, HttpStatus.UNPROCESSABLE_ENTITY);
  }

  @org.springframework.web.bind.annotation.ExceptionHandler(ApiException.class)
  public ResponseEntity<HttpErrorResponse> handleException(ApiException e) {
    log.info("Handling ApiException: {}", e.getMessage());
    var response = HttpErrorResponse.of(e.getMessage(), e.getStatus(), e.getErrors(), null);
    return new ResponseEntity<>(response, HttpStatus.valueOf(e.getStatus()));
  }

  @org.springframework.web.bind.annotation.ExceptionHandler(BadCredentialsException.class)
  public ResponseEntity<HttpErrorResponse> handleException(BadCredentialsException e) {
    log.info("Handling BadCredentialsException: {}", e.getMessage());
    var response = HttpErrorResponse.of(e.getMessage(), 401, null, null);
    return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
  }

  @org.springframework.web.bind.annotation.ExceptionHandler(AuthorizationDeniedException.class)
  public ResponseEntity<HttpErrorResponse> handleException(AuthorizationDeniedException e) {
    log.info("Handling AuthorizationDeniedException: {}", e.getMessage());
    var response = HttpErrorResponse.of(e.getMessage(), 403, null, null);
    return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
  }



  /*
   * Handler for data constraint violent => Roll back before transaction
   */
  @org.springframework.web.bind.annotation.ExceptionHandler(value = TransactionSystemException.class)
  public ResponseEntity<?> handleTransactionRollBack(TransactionSystemException e) {
    log.info("Handling AuthorizationDeniedException: {}", e.getMessage());
    var response = HttpErrorResponse.of(e.getMessage(), 400, null, null);
    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  @org.springframework.web.bind.annotation.ExceptionHandler(value = ResourceNotFoundException.class)
  public ResponseEntity<?> handleResourceNotFound(ResourceNotFoundException e) {
    var response = HttpErrorResponse.of(e.getMessage(), 404, null, null);
    return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
  }


  /**
   * Handle cac loi chung chung khong ro nguyen nhan nhu {@link RuntimeException}
   */
  @org.springframework.web.bind.annotation.ExceptionHandler(Exception.class)
  public ResponseEntity<HttpErrorResponse> handleException(Exception e) {
    log.error("Unhandled exception", e);
    var response = HttpErrorResponse.of("UNEXPECTED_ERROR", 500);
    return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
  }


}
