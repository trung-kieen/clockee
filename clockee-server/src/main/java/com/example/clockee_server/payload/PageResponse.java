package com.example.clockee_server.payload;

import java.util.List;

import org.springframework.data.domain.Page;

import lombok.Getter;

/**
 * PageResponse
 * decomposition of {@link Page}
 */
@Getter
public class PageResponse<T> {

  private final int page;
  private final int size;
  private final long totalElements;
  private final int totalPages;
  private final List<T> data;

  public PageResponse(int page, int size, long totalElements, int totalPages, List<T> data) {
    this.page = page;
    this.size = size;
    this.totalElements = totalElements;
    this.totalPages = totalPages;
    this.data = data;
  }

  public PageResponse(Page<T> page) {
    this.page = page.getNumber();
    this.size = page.getSize();
    this.totalElements = page.getTotalElements();
    this.totalPages = page.getTotalPages();
    this.data = page.getContent();
  }
}
