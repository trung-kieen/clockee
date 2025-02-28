package com.example.clockee_server.exception;

/**
 * HttpErrorResponsee
 *
 * Cac loi tra ve tuy chinh cu the ve loi kem theo
 * trong qua trinh kiem tra du lieu nhap vao (validate errors)
 */
import java.util.List;
import java.util.Map;

import lombok.Getter;

@Getter
public class HttpErrorResponse {
  private String message;
  private int status;

  /*
   * Cac loi trong qua trinh nhap du lieu cua nguoi dung
   * Chi roi truong nhap du lieu (fieldName) va loi cu the cho truong do
   * VD: "password", "mat khau khong du 8 ky tu"
   */
  private Map<String, String> errors;

  // Loi chung chung khong xac dinh
  private List<String> generalErrors;

  public static HttpErrorResponse of(String message, int status, Map<String, String> errors, List<String> generalErrors) {
    HttpErrorResponse response = new HttpErrorResponse();
    response.message = message;
    response.status = status;
    response.errors = errors;
    response.generalErrors = generalErrors;
    return response;
  }

  public static HttpErrorResponse of(String message, int status) {
    HttpErrorResponse response = new HttpErrorResponse();
    response.message = message;
    response.status = status;
    return response;
  }
}
