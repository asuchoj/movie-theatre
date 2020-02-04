import { Component, OnDestroy, OnInit } from '@angular/core';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {ShopCartService} from '../../../../core/services/shop-cart.service';
import {ProductItem} from '../../../../core/interfaces/productItem';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.scss']
})
export class ShopCartComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject();
  totalPrice: number;
  merchandises: ProductItem[];

  constructor(private shopCartService: ShopCartService) {}

  ngOnInit() {
    this.shopCartService.getTotalPrice().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(item => this.totalPrice = item);

    this.shopCartService.getItems().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(item => this.merchandises = item);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  addItem(item: ProductItem): void {
    this.shopCartService.addItem(item);
  }

  removeItem(item: ProductItem): void {
    this.shopCartService.removeItem(item);
  }

  buyProducts(): void {
    this.shopCartService.buyItems();
  }

  clear(): void {
    this.shopCartService.clear();
  }
}
