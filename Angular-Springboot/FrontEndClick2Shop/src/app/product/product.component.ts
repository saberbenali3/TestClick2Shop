import { Component } from '@angular/core';
import { Product } from '../Model/Product';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  products: Product[] = [];
  editProductId: any;
  editProduct: any;
  loading: boolean = true; // Variable pour suivre l'état du chargement

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.editProductId = this.route.snapshot.paramMap.get('id');
    if (this.editProductId != null) {
      this.productService
        .getProductById(this.editProductId)
        .subscribe((item) => {
          this.editProduct = item;
          console.log('edit jobb', this.editProduct);
        });
    }
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  // Charger tous les produits
  loadProducts(): void {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
      this.loading = false;
    });
  }

  // Ajouter un nouveau produit
  addProduct(): void {
    const newProduct: Product = {
      title: 'Nouveau Produit',
      price: 100,
      availability: 'In Stock',
      category: 'Electronics',
    };

    this.productService.createProduct(newProduct).subscribe(() => {
      this.loadProducts(); // Recharger les produits après ajout
    });
  }

  // Supprimer un produit
  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts(); // Recharger les produits après suppression
    });
  }
}
