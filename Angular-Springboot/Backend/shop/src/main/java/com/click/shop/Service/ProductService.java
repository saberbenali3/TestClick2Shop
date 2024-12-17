package com.click.shop.Service;


import com.click.shop.Model.Product;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {
    Product saveProduct(Product product);

    List<Product> getAllProducts();

    Product getProductById(Long id);

    Product updateProduct(Long id, Product product);
     List<Product> saveProductall(List<Product> products);
    void deleteProduct(Long id);
    public Page<Product> getProducts(int page, int size);
}