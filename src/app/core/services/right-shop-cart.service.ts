import {Injectable} from '@angular/core';
import {SaleInterface} from '../interfaces/sale.interface';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {RightShopCartInterfaces} from '../interfaces/right-shop-cart.interfaces';

@Injectable({
  providedIn: 'root'
})
export class RightShopCartService {
  private rightShopCart: RightShopCartInterfaces[] = [];
  private totalPrice = new BehaviorSubject(0);

  constructor() {
  }

  addItem(item: SaleInterface): void {
  //   if (this.rightShopCart.find(items => items.id = item.id)) {
  //     this.rightShopCart.find(items => items.id = item.id).count++;
  //   } else {
  //     this.rightShopCart.push({...item, count: 1});
  //   }

    this.rightShopCart.push({...item, count: 1});
    this.countTotalPrice();
  }

  getItems(): SaleInterface[] {
    return this.rightShopCart;
  }

  getTotalPrice(): BehaviorSubject<number> {
    return this.totalPrice;
  }

  countTotalPrice(): void {
    const total = this.rightShopCart.map(item => item.price).reduce((sum, current) => sum + current, 0);
    this.totalPrice.next(total);
  }
}

