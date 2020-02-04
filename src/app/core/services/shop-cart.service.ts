import {Injectable} from '@angular/core';

import {BehaviorSubject} from 'rxjs';

import {ProductItem} from '../interfaces/productItem';

@Injectable({
  providedIn: 'root'
})
export class ShopCartService {
  private shopCart: any = {};
  private totalPrice = new BehaviorSubject(0);
  private shopCartArray = new BehaviorSubject([]);

  addItem(item: ProductItem): void {
    const product = {...item};

    if (this.shopCart[product.id]) {
      this.shopCart[product.id].count++;

      if (this.shopCart[product.id].id === 2 && this.shopCart[product.id].count === 5) {
        this.shopCart[product.id].totalPrice = 3 * this.shopCart[product.id].price;
      } else {
        this.shopCart[product.id].totalPrice = this.shopCart[product.id].count * this.shopCart[product.id].price;
      }
    } else {
      this.shopCart[product.id] = product;
      this.shopCart[product.id].totalPrice = product.price;
    }

    this.countTotalPrice();
    this.getItems();
  }

  removeItem(item: ProductItem): void {
    const product = {...item};

    if (this.shopCart[product.id] && this.shopCart[product.id].count > 1) {
      this.shopCart[product.id].count--;

      if (this.shopCart[product.id].id === 2 && this.shopCart[product.id].count === 5) {
        this.shopCart[product.id].totalPrice = 3 * this.shopCart[product.id].price;
      } else {
        this.shopCart[product.id].totalPrice = this.shopCart[product.id].count * this.shopCart[product.id].price;
      }
    } else {
      delete this.shopCart[product.id];
    }

    this.countTotalPrice();
    this.getItems();
  }

  getItems(): BehaviorSubject<ProductItem[]> {
    const result = [];
    const keys = Object.keys(this.shopCart);
    keys.forEach(item => {
      result.push(this.shopCart[item]);
    });

    this.shopCartArray.next(result);
    return this.shopCartArray;
  }

  getTotalPrice(): BehaviorSubject<number> {
    return this.totalPrice;
  }

  countTotalPrice(): void {
    let result = 0;
    const keys = Object.keys(this.shopCart);

    keys.forEach(item => {
      result += this.shopCart[item].totalPrice;
    });

    this.totalPrice.next(result);
  }

  buyItems(): void {
    this.shopCartArray.next([]);
    this.shopCart = {};
    this.countTotalPrice();
    this.getItems();
  }

  clear(): void {
    this.buyItems();
  }
}
