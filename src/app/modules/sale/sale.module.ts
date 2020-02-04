import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './pages/products/products.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import {RightShopCartComponent} from './components/right-shop-cart/right-shop-cart.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductItemComponent,
    RightShopCartComponent
  ],
  exports: [
    ProductsComponent,
    ProductItemComponent,
    RightShopCartComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SaleModule {}
