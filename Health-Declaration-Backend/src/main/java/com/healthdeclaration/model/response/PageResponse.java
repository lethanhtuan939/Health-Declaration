package com.healthdeclaration.model.response;

import lombok.Builder;
import lombok.Getter;

import java.io.Serializable;

@Getter
@Builder
public class PageResponse<T> implements Serializable {
    private int page;
    private int size;
    private long totalElements;
    private long totalPages;
    private T data;
}
