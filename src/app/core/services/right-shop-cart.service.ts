import {Injectable} from '@angular/core';
import {SaleInterface} from '../interfaces/sale.interface';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RightShopCartService {
  private rightShopCart: any = {};
  private totalPrice = new BehaviorSubject(0);
  private rightShopCartArray = new BehaviorSubject([]);

  constructor() {}

  addItem(item: SaleInterface): void {
    if (this.rightShopCart[item.id]) {
      this.rightShopCart[item.id].count++;

      if (this.rightShopCart[item.id].id === 2 && this.rightShopCart[item.id].count === 5) {
        this.rightShopCart[item.id].totalPrice = 3 * this.rightShopCart[item.id].price;
      } else {
        this.rightShopCart[item.id].totalPrice = this.rightShopCart[item.id].count * this.rightShopCart[item.id].price;
      }
    } else {
      this.rightShopCart[item.id] = item;
      this.rightShopCart[item.id].totalPrice = item.price;
    }

    this.countTotalPrice();
    this.getItems();
  }

  removeItem(item: SaleInterface): void {
    if (this.rightShopCart[item.id] && this.rightShopCart[item.id].count > 1) {
      this.rightShopCart[item.id].count--;

      if (this.rightShopCart[item.id].id === 2 && this.rightShopCart[item.id].count === 5) {
        this.rightShopCart[item.id].totalPrice = 3 * this.rightShopCart[item.id].price;
      } else {
        this.rightShopCart[item.id].totalPrice = this.rightShopCart[item.id].count * this.rightShopCart[item.id].price;
      }
    } else {
      delete this.rightShopCart[item.id];
    }

    this.countTotalPrice();
    this.getItems();
  }

  getItems(): BehaviorSubject<SaleInterface[]> {
    const result = [];
    const keys = Object.keys(this.rightShopCart);
    keys.forEach(item => {
      result.push(this.rightShopCart[item]);
    });

    this.rightShopCartArray.next(result);
    return this.rightShopCartArray;
  }

  getTotalPrice(): BehaviorSubject<number> {
    return this.totalPrice;
  }

  countTotalPrice(): void {
    let result = 0;
    const keys = Object.keys(this.rightShopCart);

    keys.forEach(item => {
      result += this.rightShopCart[item].totalPrice;
    });

    this.totalPrice.next(result);
  }

  buyItems() {
    this.rightShopCartArray.next([]);
    this.rightShopCart = {};

    this.countTotalPrice();
    this.getItems();
  }
}
