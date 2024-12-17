package com.click.shop.Controller;

import com.click.shop.Model.Product;
import com.click.shop.Service.CsvService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
public class CsvController {

    @Autowired
    private CsvService csvService;

    @GetMapping("/api/fetch-products")
    public long fetchProducts() {
        return csvService.fetchCsvData();
    }
}