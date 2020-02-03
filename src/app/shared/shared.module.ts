import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RightShopCartComponent } from './components/right-shop-cart/right-shop-cart.component';

@NgModule({
  declarations: [
    RightShopCartComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RightShopCartComponent
  ]
})
export class SharedModule { }
