import {Injectable} from '@angular/core';

import {BehaviorSubject} from 'rxjs';

import {ProductItem} from '../interfaces/productItem';
import {DiscountProductIdEnum} from '../enums/discount-product-id.enum';

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
      this.shopCart[product.id].totalPrice = this.countProductPriceItem(this.shopCart[product.id]);
    } else {
      this.shopCart[product.id] = product;
      this.shopCart[product.id].totalPrice = product.price;
    }

    this.recountData();
  }

  removeItem(item: ProductItem): void {
    const product = {...item};

    if (this.shopCart[product.id] && this.shopCart[product.id].count > 1) {
      this.shopCart[product.id].count--;
      this.shopCart[product.id].totalPrice = this.countProductPriceItem(this.shopCart[product.id]);
    } else {
      delete this.shopCart[product.id];
    }

    this.recountData();
  }

  getItems(): BehaviorSubject<any[]> {
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

  buyItems(): void {
    // Todo: change when add api
    this.clear();
  }

  clear(): void {
    this.shopCartArray.next([]);
    this.shopCart = {};
    this.recountData();
  }

  private countTotalPrice(): void {
    let result = 0;
    const keys = Object.keys(this.shopCart);

    keys.forEach(item => {
      result += this.shopCart[item].totalPrice;
    });

    this.totalPrice.next(result);
  }

  private recountData(): void {
    this.countTotalPrice();
    this.getItems();
  }

  private countProductPriceItem(item: ProductItem): number {
    if (item.id === DiscountProductIdEnum.Snickers) {
      if (item.count >= 5) {
        return (item.price * ( item.count % 5)) + item.price * 3 * ((item.count - item.count % 5) / 5);
      } else {
        return item.price * item.count;
      }
    } else {
      return item.price * item.count;
    }
  }
}
