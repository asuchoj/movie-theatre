import {Injectable} from '@angular/core';

import {BehaviorSubject} from 'rxjs';

import {ProductItem} from '../interfaces/productItem';
import {DiscountProductIdEnum} from '../enums/discount-product-id.enum';

@Injectable({
  providedIn: 'root'
})
export class ShopCartService {
  private shopCart = new Map();
  private totalPrice = new BehaviorSubject(0);
  private shopCartArray = new BehaviorSubject([]);

  addItem(item: ProductItem): void {
    const product = {...item};

    if (this.shopCart.has(product.id)) {
      const productItem = this.shopCart.get(product.id);

      productItem.count++;
      productItem.totalPrice = this.countProductPriceItem(productItem);
    } else {
      this.shopCart.set(product.id, product);
      this.shopCart.get(product.id).totalPrice = product.price;
    }

    this.recountData();
  }

  removeItem(item: ProductItem): void {
    const product = {...item};

    if (this.shopCart.has(product.id) && this.shopCart.get(product.id).count > 1) {
      const productItem = this.shopCart.get(product.id);

      productItem.count--;
      productItem.totalPrice = this.countProductPriceItem(productItem);
    } else {
      this.shopCart.delete(product.id);
    }

    this.recountData();
  }

  getItems(): BehaviorSubject<any[]> {
    const result = [];

    this.shopCart.forEach(item => {
      result.push(item);
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
    this.shopCart.clear();
    this.recountData();
  }

  private countTotalPrice(): void {
    let result = 0;

    this.shopCart.forEach(item => {
      result += item.totalPrice;
    });

    this.totalPrice.next(result);
  }

  private recountData(): void {
    this.countTotalPrice();
    this.getItems();
  }

  private countProductPriceItem(item: ProductItem): number {
    if (item.id === DiscountProductIdEnum.Snickers && item.count >= 5) {
      const snickersCountWithoutDiscount = item.count % 5;
      const discountSnickersGroupCount = (item.count - snickersCountWithoutDiscount) / 5;

      return item.price * (snickersCountWithoutDiscount + 3 * discountSnickersGroupCount);
    }

    return item.price * item.count;
  }
}
