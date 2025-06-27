package com.example.clockee_server.util;

import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.CustomerSearchResult;
import com.stripe.model.Product;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.CustomerSearchParams;
import com.stripe.param.ProductCreateParams;
import com.stripe.param.ProductSearchParams;

public class StripeUtils {

  public static Customer findOrCreateCustomer(String email, String name) throws StripeException {
    CustomerSearchParams params = CustomerSearchParams.builder().setQuery(String.format("email:'%s'", email)).build();
    var searchResult = Customer.search(params);
    final boolean customerNotExist = searchResult.getData().size() == 0;
    if (customerNotExist) {
      // Create new customer
      var customerCreateParams = CustomerCreateParams.builder().setName(name).setEmail(email).build();
      return Customer.create(customerCreateParams);
    }
    // Get exist customer
    return searchResult.getData().get(0);
  }

  public static Product findOrCreateProduct(Long productId, String productName)
      throws StripeException {
    ProductSearchParams params = ProductSearchParams.builder()
        .setQuery(String.format("metadata['app_id']:'%d'", productId)).build();
    var searchResult = Product.search(params);
    final boolean productNotExist = searchResult.getData().size() == 0;
    if (productNotExist) {
      // Create new customer
      var productCreateParams = ProductCreateParams.builder()
          .setName(productName)
          .putMetadata("app_id", productId.toString())
          .build();
      return Product.create(productCreateParams);
    }
    // Get exist customer
    return searchResult.getData().get(0);
  }

  public static Customer findCustomerByEmail(String email) throws StripeException {
    CustomerSearchParams params = CustomerSearchParams.builder().setQuery("email:'" + email + "'").build();

    CustomerSearchResult result = Customer.search(params);

    return result.getData().size() > 0 ? result.getData().get(0) : null;
  }

  private StripeUtils() {
  }
}
