import { ApiError } from "@/gen";
import { HttpErrorResponse } from "@/model/HttpErrorResponse";
import { FieldValues, UseFormSetError } from "react-hook-form";
import { toast } from "react-toastify";

/**
 * Server validation input
 * See @see HttpErrorResponse
 *
 */
export const mapApiErrorsToForm = <T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>,
) => {
  if (error instanceof ApiError && error.body) {
    const errorResponse = error.body as HttpErrorResponse;

    // Set form-wide error message
    if (errorResponse.message) {
      setError("root", { message: errorResponse.message });
    }

    if (errorResponse.errors) {
      Object.entries(errorResponse.errors).forEach(([key, value]) => {
        const errorMessage = `${key} - ${value}`;
        setError("root", { message: errorMessage });
        // setError(key as keyof T, { message: errorMessage });
      });
    }
  }
};

/**
 * Popup senmantic error (message) if HttpErrorResponse is catch
 */
export const popupRequestError = (error: unknown) => {
  if (error instanceof ApiError && error.body) {
    const errorResponse = error.body as HttpErrorResponse;

    // Set form-wide error message
    if (errorResponse.message) {
      toast.error(errorResponse.message);
    }
  }

}
