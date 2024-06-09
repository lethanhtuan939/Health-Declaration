package com.healthdeclaration.model.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.healthdeclaration.exception.ValidationError;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Builder
@Getter
@Setter
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseObject<T> {

    private int status;
    private String message;
    private T data;
    private List<ValidationError> errors;
}
