package com.click.shop.Model;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Table(name = "products")
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long  id;
    @Lob
    @Column(nullable = false)
    private String title;
    @Lob
    @Column(nullable = false)
    private String price;
    @Lob
    private String availability;
    @Lob
    private String category;
}