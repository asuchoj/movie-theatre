import {Component, OnDestroy, OnInit} from '@angular/core';
import {SaleService} from '../../services/sale.service';
import {SaleInterface} from '../../../../core/interfaces/sale.interface';
import {RightShopCartService} from '../../../../core/services/right-shop-cart.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  sweets: SaleInterface[];
  private unsubscribe$ = new Subject();

  constructor(
    public sale: SaleService,
    public rightShopCartService: RightShopCartService
  ) {}

  ngOnInit() {
    this.sale.getSweets().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(sweets => this.sweets = sweets);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  addaToTheRightShopCar(id: number): void {
    this.rightShopCartService.addItem(this.sweets.find(item => item.id === id));
  }
}
