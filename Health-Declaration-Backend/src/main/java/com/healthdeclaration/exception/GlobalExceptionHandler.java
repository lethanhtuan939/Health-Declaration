package com.healthdeclaration.exception;

import com.healthdeclaration.model.response.ResponseObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.List;
import java.util.stream.Collectors;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({MethodArgumentNotValidException.class, HttpMessageNotReadableException.class})
    public ResponseEntity<ResponseObject<Object>> handleValidationExceptions(Exception ex) {
        List<ValidationError> errors = null;
        String message;

        if (ex instanceof MethodArgumentNotValidException) {
            errors = ((MethodArgumentNotValidException) ex).getBindingResult()
                    .getAllErrors()
                    .stream()
                    .map(error -> new ValidationError(
                            ((FieldError) error).getField(),
                            error.getDefaultMessage()))
                    .collect(Collectors.toList());
            message = "Validation failed";
        } else if (ex instanceof HttpMessageNotReadableException) {
            message = "Malformed JSON request";
        } else {
            message = "Unexpected error";
        }

        ResponseObject<Object> responseObject = ResponseObject.<Object>builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .message(message)
                .errors(errors)
                .build();

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseObject);
    }

    @ExceptionHandler({PasswordMismatchException.class, UserAlreadyExistsException.class})
    public ResponseEntity<ResponseObject<Object>> handleCustomExceptions(RuntimeException ex) {
        HttpStatus status = ex instanceof PasswordMismatchException ? HttpStatus.BAD_REQUEST : HttpStatus.CONFLICT;

        ResponseObject<Object> responseObject = ResponseObject.<Object>builder()
                .status(status.value())
                .message(ex.getMessage())
                .build();

        return ResponseEntity.status(status).body(responseObject);
    }

    @ExceptionHandler({BadCredentialsException.class, DisabledException.class})
    public ResponseEntity<ResponseObject<Object>> handleBadCredentialsException(BadCredentialsException ex) {

        String message = ex instanceof BadCredentialsException ? "Email or password is incorrect!" : "Your account is blocked!";
        ResponseObject<Object> responseObject = ResponseObject.<Object>builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .message(message)
                .build();

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseObject);
    }

    @ExceptionHandler(UserInactiveException.class)
    public ResponseEntity<ResponseObject<Object>> handleUserInactiveException(UserInactiveException ex) {
        ResponseObject<Object> responseObject = ResponseObject.<Object>builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .message(ex.getMessage())
                .build();

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseObject);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ResponseObject<Object>> handleResourceNotFoundException(ResourceNotFoundException ex) {

        ResponseObject<Object> responseObject = ResponseObject.<Object>builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .message(ex.getMessage())
                .build();

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseObject);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ResponseObject<Object>> handleRuntimeException(RuntimeException ex) {

        ResponseObject<Object> responseObject = ResponseObject.<Object>builder()
                .status(HttpStatus.FORBIDDEN.value())
                .message(ex.getMessage())
                .build();

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(responseObject);
    }
}
