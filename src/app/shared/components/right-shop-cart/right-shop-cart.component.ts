import { Component, OnDestroy, OnInit } from '@angular/core';
import {RightShopCartService} from '../../../core/services/right-shop-cart.service';
import {SaleInterface} from '../../../core/interfaces/sale.interface';

@Component({
  selector: 'app-right-shop-cart',
  templateUrl: './right-shop-cart.component.html',
  styleUrls: ['./right-shop-cart.component.scss']
})
export class RightShopCartComponent implements OnInit, OnDestroy {
  merchandises: SaleInterface[];
  totalPrice: number;

  constructor(private rightShopCartService: RightShopCartService) {}

  ngOnInit() {
    this.rightShopCartService.getTotalPrice().subscribe(item => this.totalPrice = item);
    this.rightShopCartService.getItems().subscribe(item => this.merchandises = item);
  }

  ngOnDestroy() {}

  addItem(item: SaleInterface) {
    this.rightShopCartService.addItem(item);
  }

  removeItem(item: SaleInterface) {
    this.rightShopCartService.removeItem(item);
  }

  buy() {
    this.rightShopCartService.buyItems();
  }
}
