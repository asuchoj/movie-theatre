import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleComponent } from './pages/sale/sale.component';
import { SaleItemComponent } from './components/sale-item/sale-item.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    SaleComponent,
    SaleItemComponent
  ],
  exports: [
    SaleComponent,
    SaleItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class SaleModule { }
