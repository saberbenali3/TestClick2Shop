import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/Model/Product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent {
  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    if (productId) {
      console.log(productId);
      this.productService.getProductById(productId).subscribe(
        (data) => {
          this.product = data;
          console.log(data);

        },
        (error) => {
          console.error('Error fetching product', error);
        }
      );
    }
  }

  goBack(): void {
    window.history.back();
  }
}
