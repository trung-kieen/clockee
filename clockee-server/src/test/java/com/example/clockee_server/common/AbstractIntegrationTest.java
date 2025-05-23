package com.example.clockee_server.common;

import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.util.TestPropertyValues;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.test.web.servlet.setup.SharedHttpSessionConfigurer;
import org.springframework.web.context.WebApplicationContext;
import org.testcontainers.containers.MSSQLServerContainer;
import org.testcontainers.utility.DockerImageName;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@ActiveProfiles("test")
@SpringBootTest(webEnvironment = RANDOM_PORT)
@AutoConfigureMockMvc
// Configure dynamic properties
@ContextConfiguration(initializers = { AbstractIntegrationTest.Initializer.class })
public abstract class AbstractIntegrationTest {

  @Autowired
  protected MockMvc mockMvc;


  // @BeforeEach
  // void setUp(WebApplicationContext wac){
  //   this.mockMvc = MockMvcBuilders.webAppContextSetup(wac)
  //       .defaultRequest(get("/").accept(MediaType.APPLICATION_JSON))
  //       .apply(SharedHttpSessionConfigurer.sharedHttpSession())
  //       .alwaysExpect(status().isOk())
  //       .alwaysExpect(content().contentType("application/json;charset=UTF-8"))
  //       .build();

  // }


  @Autowired
  protected ObjectMapper objectMapper;

  private static MSSQLServerContainer<?> sqlContainer;

  static {
    sqlContainer = new MSSQLServerContainer<>(DockerImageName.parse("mcr.microsoft.com/mssql/server:2022-latest"));
    sqlContainer.acceptLicense();
    // sqlContainer.withDatabaseName("clockeedb");
    // sqlContainer.withDatabaseName("clockeedb")
    //     .withUsername("sa")
    //     .withPassword("example_123");
    sqlContainer.start();
  }

  public static class Initializer
      implements ApplicationContextInitializer<ConfigurableApplicationContext> {
    public void initialize(ConfigurableApplicationContext configurableApplicationContext) {
      TestPropertyValues.of(
          "spring.datasource.url=" + sqlContainer.getJdbcUrl(),
          "spring.datasource.username=" + sqlContainer.getUsername(),
          "spring.datasource.password=" + sqlContainer.getPassword())
          .applyTo(configurableApplicationContext.getEnvironment());
    }
  }

}
