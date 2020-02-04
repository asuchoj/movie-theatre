import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SaleInterface} from '../../../../core/interfaces/sale.interface';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input() saleItem: SaleInterface;
  @Output() addaToTheRightShopCar = new EventEmitter<number>();
}
