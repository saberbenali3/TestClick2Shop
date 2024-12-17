package com.click.shop.Service.Impl;

import com.click.shop.Model.Product;
import com.click.shop.Service.CsvService;
import com.click.shop.Service.ProductService;
import com.opencsv.CSVParserBuilder;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

@Service
public class CsvServiceImpl implements CsvService {
    String urll = "https://export.beezup.com/Son_Videocom/Affilae_FRA/ec84d19f-30c0-5102-958d-720856077d4e";

    @Autowired
    private ProductService productService;

    @Override
    public long fetchCsvData() {
        List<Product> products = new ArrayList<>();
        int i = 0;
        try {
            URL url = new URL(urll);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");

            try (CSVReader csvReader = new CSVReaderBuilder(
                    new InputStreamReader(connection.getInputStream(), "UTF-8"))
                    .withCSVParser(new CSVParserBuilder()
                            .withSeparator(';')
                            .withQuoteChar('"')
                            .build())
                    .build()) {
                String[] values;

                csvReader.readNext();

                while ((values = csvReader.readNext()) != null && i<5000) {
                    i++;
                    String category = null;
                    if (values[3] != null) {
                        if (values[3].contains("Vidéoprojecteurs")) {
                            category = "Vidéoprojecteurs";
                        } else if (values[3].contains("Barres de son")) {
                            category = "Barres de son";
                        } else if (values[3].contains("Télévision")) {
                            category = "Télévision";
                        }
                    }
                    if (category != null) {
                        System.out.println("i=" + i);
                        if (values.length > 0) {
                            System.out.println(values[0] + "   " + values[1] + "   " + values[3] + "   " + values[8] + "   " + values[9]);
                            Product product = new Product();
                            product.setTitle(values[1]);
                            product.setCategory(category);
                            product.setAvailability(values[8]);
                            product.setPrice(values[9]);
                            products.add(product);
                        }
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        productService.saveProductall(products);
        return products.size();
    }
}
