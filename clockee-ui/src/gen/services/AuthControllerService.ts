/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUserRequest } from "../models/CreateUserRequest";
import type { JwtTokenResponse } from "../models/JwtTokenResponse";
import type { LoginRequest } from "../models/LoginRequest";
import type { RefreshTokenResponse } from "../models/RefreshTokenResponse";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class AuthControllerService {
  /**
   * @param requestBody
   * @returns any OK
   * @throws ApiError
   */
  public static register(
    requestBody: CreateUserRequest,
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/auth/register",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * @param refreshToken
   * @returns RefreshTokenResponse OK
   * @throws ApiError
   */
  public static refreshAccessToken(
    refreshToken?: string,
  ): CancelablePromise<RefreshTokenResponse> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/auth/refresh",
      cookies: {
        refreshToken: refreshToken,
      },
    });
  }
  /**
   * @param requestBody
   * @returns JwtTokenResponse OK
   * @throws ApiError
   */
  public static login(
    requestBody: LoginRequest,
  ): CancelablePromise<JwtTokenResponse> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/auth/login",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * @param tokenId
   * @returns JwtTokenResponse OK
   * @throws ApiError
   */
  public static verifyEmail(
    tokenId: number,
  ): CancelablePromise<JwtTokenResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/auth/verify-email",
      query: {
        tokenId: tokenId,
      },
    });
  }
  /**
   * @returns any OK
   * @throws ApiError
   */
  public static logoutUser(): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/auth/logout",
    });
  }
}
