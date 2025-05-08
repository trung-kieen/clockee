// package com.example.clockee_server.controller;

// import java.util.List;

// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.mockito.Mockito;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.http.MediaType;
// import org.springframework.test.context.ActiveProfiles;
// import org.springframework.test.context.bean.override.mockito.MockitoBean;
// import org.springframework.test.web.servlet.MockMvc;
// import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
// import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
// import org.thymeleaf.standard.expression.AndExpression;

// import com.example.clockee_server.auth.dto.CreateUserRequest;
// import com.example.clockee_server.auth.dto.JwtTokenResponse;
// import com.example.clockee_server.auth.dto.LoginRequest;
// import com.example.clockee_server.auth.service.AuthenticationService;
// import com.fasterxml.jackson.databind.ObjectMapper;

// /**
//  * UserControllerTest
//  */
// // @ActiveProfiles("test")
// @SpringBootTest
// @AutoConfigureMockMvc
// public class AuthControllerTest {
//   @Autowired
//   private MockMvc mockMvc;

//   @MockitoBean
//   private AuthenticationService authService;

//   private CreateUserRequest createUserRequest;

//   private LoginRequest loginRequest;

//   private JwtTokenResponse jwtTokenResponse;

//   @BeforeEach

//   private void initData() {
//     createUserRequest = CreateUserRequest.builder()
//         .name("ABC")
//         .email("helloworld@gmail.com")
//         .password("Helloworld12398*")
//         .passwordConfirmation("Helloworld12398*")
//         .build();

//     loginRequest = LoginRequest.builder()
//         .email("helloworld@gmail.com")
//         .password("Helloworld12398*")
//         .build();

//     // For mocking in test
//     jwtTokenResponse = JwtTokenResponse.builder()
//         .username("helloworld@gmail.com")
//         .roles(List.of("CUSTOMER"))
//         .isVerified(false)
//         .accessToken(
//             "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBjbG9ja2VlLmNvbSIsImlhdCI6MTc0NjUzMzgwMCwiZXhwIjoxNzQ2NTM0NzAwfQ.dmNuAyN9Mz03-unI1PFg_tp1RtW9948ER8XaChvDAdQ")
//         .build();

//   }

//   @Test
//   public void testRegister_success() throws Exception {

//     // TODO: Mock response instead

//     // Given user request login as string
//     ObjectMapper objectMapper = new ObjectMapper();
//     String requestContent = objectMapper.writeValueAsString(createUserRequest);

//     // Check if response for valid register is ok
//     mockMvc.perform(MockMvcRequestBuilders.post("/auth/register")
//         .contentType(MediaType.APPLICATION_JSON_VALUE)
//         .content(requestContent))
//         .andExpect(MockMvcResultMatchers.status().isOk());

//   }

//   @Test
//   public void testRegister_passwordNotMatch() throws Exception {
//     // Given password not match confirm password
//     createUserRequest.setPasswordConfirmation("This will not be match");
//     ObjectMapper objectMapper = new ObjectMapper();

//     String requestContent = objectMapper.writeValueAsString(createUserRequest);

//     // Then response unprocess for senmantic validate error in client
//     mockMvc.perform(MockMvcRequestBuilders.post("/auth/register")
//         .contentType(MediaType.APPLICATION_JSON_VALUE)
//         .content(requestContent))
//         .andExpect(MockMvcResultMatchers.status().isUnprocessableEntity());

//   }

//   @Test
//   public void testLogin_success() throws Exception {
//     ObjectMapper objectMapper = new ObjectMapper();
//     String requestContent = objectMapper.writeValueAsString(loginRequest);

//     // Mock response
//     Mockito.when(authService.login(Mockito.any(LoginRequest.class)))
//         .thenReturn(jwtTokenResponse);

//     // Then response jwt token, user details
//     mockMvc.perform(MockMvcRequestBuilders.post("/auth/login")
//         .contentType(MediaType.APPLICATION_JSON)
//         .content(requestContent))
//         .andExpect(MockMvcResultMatchers.status().isOk())
//         .andExpect(MockMvcResultMatchers.jsonPath("username").value("helloworld@gmail.com"))
//         .andExpect(MockMvcResultMatchers.jsonPath("refreshToken").doesNotExist());
//   }

//   @Test
//   public void testVerifyEmail_success() throws Exception {
//     Mockito.doNothing().when(authService).verify(1L, 921222);
//     mockMvc.perform(MockMvcRequestBuilders.get("/auth/verify-email")
//         .param("userId", "1")
//         .param("token", "921222")).andExpect(MockMvcResultMatchers.status().isAccepted());

//   }

// }
