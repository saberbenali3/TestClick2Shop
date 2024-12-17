import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Product } from 'src/app/Model/Product';
import { ProductService } from 'src/app/product.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent {
  products: Product[] = [];
  totalItems: number = 0;
  totalPages: number = 0;  // Nouvelle variable pour afficher le nombre total de pages
  currentPage: number = 0;
  pageSize: number = 20;
  loading: boolean = true;

  constructor(private productService: ProductService ,
    private router: Router,  // Injecter Router ici
    private dialog: MatDialog // Injectez MatDialog

  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getProducts(this.currentPage, this.pageSize).subscribe(response => {
      this.products = response.content;
      this.totalItems = response.totalElements;
      this.totalPages = response.totalPages;  // Récupère le nombre total de pages depuis la réponse
      this.loading = false;
    });
  }

  // Pagination methods
  goToPage(page: number): void {
    this.currentPage = page;
    this.loadProducts();
  }

  viewProduct(product: Product): void {
    console.log("viewproduct");

    console.log(product)
    this.router.navigate([`/admin/product/${product.id}`]); // Naviguer vers le chemin '/admin/product/:id'
  }

  // Modifier le produit (navigation vers la page d'édition du produit)
  editProduct(product: Product): void {
    this.router.navigate([`/admin/editproduct/${product.id}`]); // Naviguer vers le chemin '/admin/editproduct/:id'
  }
  deleteProduct(productId: number | null | undefined): void {
    // Vérifiez si productId est un number
    if (typeof productId === 'number') {
      // Afficher la boîte de dialogue de confirmation
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Confirmer la suppression',
          message: 'Êtes-vous sûr de vouloir supprimer ce produit ?',
          onCancel: () => dialogRef.close(),
          onConfirm: () => {
            this.productService.deleteProduct(productId).subscribe(() => {
              this.products = this.products.filter(product => product.id !== productId);
              dialogRef.close(); // Fermer la boîte de dialogue
            });
          }
        }
      });
    } else {
      console.error('ID du produit non valide.');
    }
  }
}
