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

  addItem(item: SaleInterface): void {
    const product = {...item};

    if (this.rightShopCart[product.id]) {
      this.rightShopCart[product.id].count++;

      if (this.rightShopCart[product.id].id === 2 && this.rightShopCart[product.id].count === 5) {
        this.rightShopCart[product.id].totalPrice = 3 * this.rightShopCart[product.id].price;
      } else {
        this.rightShopCart[product.id].totalPrice = this.rightShopCart[product.id].count * this.rightShopCart[product.id].price;
      }
    } else {
      this.rightShopCart[product.id] = product;
      this.rightShopCart[product.id].totalPrice = product.price;
    }

    this.countTotalPrice();
    this.getItems();
  }

  removeItem(item: SaleInterface): void {
    const product = {...item};

    if (this.rightShopCart[product.id] && this.rightShopCart[product.id].count > 1) {
      this.rightShopCart[product.id].count--;

      if (this.rightShopCart[product.id].id === 2 && this.rightShopCart[product.id].count === 5) {
        this.rightShopCart[product.id].totalPrice = 3 * this.rightShopCart[product.id].price;
      } else {
        this.rightShopCart[product.id].totalPrice = this.rightShopCart[product.id].count * this.rightShopCart[product.id].price;
      }
    } else {
      delete this.rightShopCart[product.id];
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

  buyItems(): void {
    this.rightShopCartArray.next([]);
    this.rightShopCart = {};
    this.countTotalPrice();
    this.getItems();
  }

  clear(): void {
    this.buyItems();
  }
}
