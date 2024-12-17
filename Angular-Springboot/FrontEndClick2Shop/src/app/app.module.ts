import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProductComponent } from './Admin/add-product/add-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { HttpClientModule } from '@angular/common/http';
import { ViewProductComponent } from './Admin/view-product/view-product.component';
import { ListProductComponent } from './Admin/list-product/list-product.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDialogComponent } from './Admin/confirm-dialog/confirm-dialog.component';
import { CsvResultComponent } from './csv-result/csv-result.component'; 
@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    HomeComponent,
    ProductComponent,
    ViewProductComponent,
    ListProductComponent,
    ConfirmDialogComponent,
    CsvResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule  // Assurez-vous que HttpClientModule est ici

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
