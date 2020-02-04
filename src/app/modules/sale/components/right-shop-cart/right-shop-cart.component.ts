import { Component, OnDestroy, OnInit } from '@angular/core';
import {RightShopCartService} from '../../../../core/services/right-shop-cart.service';
import {SaleInterface} from '../../../../core/interfaces/sale.interface';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-right-shop-cart',
  templateUrl: './right-shop-cart.component.html',
  styleUrls: ['./right-shop-cart.component.scss']
})
export class RightShopCartComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject();
  totalPrice: number;
  merchandises: SaleInterface[];

  constructor(private rightShopCartService: RightShopCartService) {}

  ngOnInit() {
    this.rightShopCartService.getTotalPrice().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(item => this.totalPrice = item);

    this.rightShopCartService.getItems().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(item => this.merchandises = item);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  addItem(item: SaleInterface): void {
    this.rightShopCartService.addItem(item);
  }

  removeItem(item: SaleInterface): void {
    this.rightShopCartService.removeItem(item);
  }

  buyProducts(): void {
    this.rightShopCartService.buyItems();
  }

  clear(): void {
    this.rightShopCartService.clear();
  }
}
