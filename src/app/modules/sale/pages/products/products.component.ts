import {Component, OnDestroy, OnInit} from '@angular/core';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {ProductsService} from '../../services/products.service';
import {ProductItem} from '../../../../core/interfaces/productItem';
import {ShopCartService} from '../../../../core/services/shop-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: ProductItem[];
  private unsubscribe$ = new Subject();

  constructor(
    public productsService: ProductsService,
    public shopCartService: ShopCartService
  ) {}

  ngOnInit() {
    this.productsService.getProducts().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(products => this.products = products);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  addToShopCar(id: number): void {
    this.shopCartService.addItem(this.products.find(item => item.id === id));
  }
}
