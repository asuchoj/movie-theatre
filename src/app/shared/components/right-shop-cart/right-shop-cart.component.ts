import { Component, OnInit } from '@angular/core';
import {RightShopCartService} from '../../../core/services/right-shop-cart.service';
import {SaleInterface} from '../../../core/interfaces/sale.interface';

@Component({
  selector: 'app-right-shop-cart',
  templateUrl: './right-shop-cart.component.html',
  styleUrls: ['./right-shop-cart.component.scss']
})
export class RightShopCartComponent implements OnInit{

  merchandises: SaleInterface[];
  totalPrice: number;

  constructor(private rightShopCartService: RightShopCartService) {
    this.merchandises = this.rightShopCartService.getItems();
  }

  ngOnInit() {
    this.rightShopCartService.getTotalPrice().subscribe(item => {
      this.totalPrice = item;
    });
  }

  addItem(id: number) {
    this.rightShopCartService
  }

  removeItem(id: number) {

  }
}
