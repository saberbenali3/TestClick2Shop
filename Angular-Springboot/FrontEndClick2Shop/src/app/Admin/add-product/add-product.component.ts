import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/Model/Product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{
  productForm: FormGroup;
Add : String | undefined ;


  constructor(private fb: FormBuilder, private productService: ProductService ,     private route: ActivatedRoute
       , private router: Router,  // Injecter Router ici
    
  ) {
    this.productForm = this.fb.group({
      id: [null],
      title: ['', [Validators.required, Validators.minLength(3)]],
      availability: [''],
      category:['',Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]],
    });
  }
  isSubmitting: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  editProductId: any;
  editProduct: any;

 



    
  
  ngOnInit(): void {
    this.editProductId = this.route.snapshot.paramMap.get('id');
    if (this.editProductId != null) {
      this.productService
        .getProductById(this.editProductId)
        .subscribe((item) => {
          this.editProduct = item;
          this.Add="edit ";
          console.log('edit jobb', this.editProduct);
          this.productForm.setValue({
            id: this.editProduct.id,
            title: this.editProduct.title,
            availability: this.editProduct.availability,
            category: this.editProduct.category,
            price:  this.editProduct.price
          });
        });

        
    } 
  else {
    this.Add="Add ";
  } }

 
  onSubmit() {
    if (this.productForm.valid) {
      this.isSubmitting = true; 
      const productData = this.productForm.value;
if (  this.editProductId!= null) {
  this.productService.updateProduct(this.editProductId,productData).subscribe({
    next: (response) => {
      console.log(this.editProductId);
      console.log(productData);

      this.successMessage = 'Product is edited successfully!';
      this.errorMessage = '';
      this.productForm.reset(); 
      this.router.navigate([`/admin/product/${this.editProductId}`]); 
    },
    error: (error) => {
      console.error('Error Editing product:', error);
      this.errorMessage = 'An error occurred while adding the product.';
      this.successMessage = '';
    },
    complete: () => {
      this.isSubmitting = false;
    },
  });
}
    
      this.productService.createProduct(productData).subscribe({
        next: (response) => {
          console.log('Product added successfully:', response);
          this.successMessage = 'Product added successfully!';
          this.errorMessage = '';
          this.productForm.reset(); 
          console.log('Product added successfully:', response.id);

          this.router.navigate([`/admin/product/${response.id}`]); 

        },
        error: (error) => {
          console.error('Error adding product:', error);
          this.errorMessage = 'An error occurred while adding the product.';
          this.successMessage = '';
        },
        complete: () => {
          this.isSubmitting = false;
        },
      });
    }
  }
}
