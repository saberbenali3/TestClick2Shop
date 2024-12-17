import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddProductComponent } from './Admin/add-product/add-product.component';
import { ViewProductComponent } from './Admin/view-product/view-product.component';
import { ProductComponent } from './product/product.component';
import { ListProductComponent } from './Admin/list-product/list-product.component';
import { CsvResultComponent } from './csv-result/csv-result.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {path:'csv-result', component: CsvResultComponent},
  { path: 'admin/addproduct', component: AddProductComponent },
  { path: 'admin/editproduct/:id', component: AddProductComponent },
  { path: 'admin/product/:id', component: ViewProductComponent },
  { path: 'admin', component: ListProductComponent },

  { path: 'products', component: ProductComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
