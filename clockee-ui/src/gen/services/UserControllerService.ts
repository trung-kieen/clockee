/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CurrentUserDetails } from '../models/CurrentUserDetails';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserControllerService {
    /**
     * @returns CurrentUserDetails OK
     * @throws ApiError
     */
    public static currentUserDetail(): CancelablePromise<CurrentUserDetails> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/me',
        });
    }
}
