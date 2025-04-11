package com.example.clockee_server.util;

import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

/**
 * ApplicationContextProvider Cung cap cac phuong thuc lam viec voi Bean trong IoC container
 * Example: password = passwordEncoder.encode(newPassword);
 */
@Component
public class ApplicationContextProvider implements ApplicationContextAware {
  private static ApplicationContext context;

  /** Lay object type T tu application context theo kieu du lieu T truyen vao */
  public static <T> T bean(Class<T> beanType) {
    return context.getBean(beanType);
  }

  /** Lay object tu application context theo theo ten cua bean trong IoC */
  public static Object bean(String name) {
    return context.getBean(name);
  }

  @Override
  public void setApplicationContext(@SuppressWarnings("NullableProblems") ApplicationContext ac) {
    context = ac;
  }
}
