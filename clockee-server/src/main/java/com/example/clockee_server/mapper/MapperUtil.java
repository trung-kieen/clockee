package com.example.clockee_server.mapper;

import com.example.clockee_server.payload.PageResponse;
import com.example.clockee_server.util.ApplicationContextProvider;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;

public class MapperUtil {
  private static final ModelMapper modelMapper = ApplicationContextProvider.bean(ModelMapper.class);

  public static <S, D> D mapObject(S source, Class<D> destinationType) {
    return modelMapper.map(source, destinationType);
  }

  public static <S, D> List<D> mapList(List<S> sourceList, Function<S, D> converter) {
    return sourceList.stream().map(converter).collect(Collectors.toList());
  }

  /*
   * Convert entity page to dto page
   */
  public static <S, D> PageResponse<D> mapPageResponse(
      Page<S> sourcePage, Class<D> destinationType) {

    var targetList =
        sourcePage.getContent().stream()
            .map(source -> modelMapper.map(source, destinationType))
            .collect(Collectors.toList());
    return new PageResponse<D>(targetList, sourcePage);
  }

  public static <S, D> PageResponse<D> mapPageResponse(
      Page<S> sourcePage, Function<S, D> converter) {

    List<D> targetList =
        sourcePage.getContent().stream().map(converter).collect(Collectors.toList());
    return new PageResponse<D>(targetList, sourcePage);
  }
}
