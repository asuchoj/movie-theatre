import { Component, OnInit } from '@angular/core';
import {SaleService} from '../../services/sale.service';
import {SaleInterface} from '../../../../core/interfaces/sale.interface';
import {RightShopCartService} from '../../../../core/services/right-shop-cart.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {
  sweets: SaleInterface[];

  constructor(
    public sale: SaleService,
    public rightShopCartService: RightShopCartService
  ) { }

  ngOnInit() {
    this.sale.getSweets().subscribe(sweets => this.sweets = sweets);
  }

  addaToTheRightShopCar(id: number) {
    console.log(this.sweets.find(item => item.id === id));


    this.rightShopCartService.addItem(this.sweets.find(item => item.id === id));
    console.log(id);
  }
}
