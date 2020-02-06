import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './pages/products/products.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ShopCartComponent } from './components/shop-cart/shop-cart.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductItemComponent,
    ShopCartComponent
  ],
  exports: [
    ProductsComponent,
    ProductItemComponent,
    ShopCartComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SaleModule {}
