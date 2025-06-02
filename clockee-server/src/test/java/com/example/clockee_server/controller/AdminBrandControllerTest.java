package com.example.clockee_server.controller;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.*;
import static org.springframework.test.web.servlet.setup.SharedHttpSessionConfigurer.*;

import com.example.clockee_server.common.AbstractIntegrationTest;
import com.example.clockee_server.config.ApplicationConstants;
import com.example.clockee_server.controller.admin.AdminBrandController;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.test.context.support.WithMockUser;

/** AdminBrandControllerTest {@link AdminBrandController} */
public class AdminBrandControllerTest extends AbstractIntegrationTest {

  @BeforeEach
  private void init() {}

  @Test
  @WithMockUser(username = "test_user", roles = ApplicationConstants._PRODUCT_ADMIN)
  public void getProductWithAppropriateRole_success() throws Exception {
    mockMvc.perform(get("/admin/brands").secure(true)).andExpect(status().isOk());
  }

  @Test
  @WithMockUser(username = "test_user")
  public void getProductWithoutRole_fail() throws Exception {
    mockMvc.perform(get("/admin/brands").secure(true)).andExpect(status().isUnauthorized());
  }

  // Status code 401 or 403 ??? Checkout AuthEntryPoint
  // @Test
  // @WithMockUser(username = "test_user", roles = ApplicationConstants._INVENTORY_MANAGER)
  // public void getProductWrongRole_fail() throws Exception {
  //   mockMvc.perform(get("/admin/brands").secure(true)).andExpect(status().isForbidden());
  // }
}
