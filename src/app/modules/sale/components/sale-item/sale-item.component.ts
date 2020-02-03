import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SaleInterface} from '../../../../core/interfaces/sale.interface';

@Component({
  selector: 'app-sale-item',
  templateUrl: './sale-item.component.html',
  styleUrls: ['./sale-item.component.scss']
})
export class SaleItemComponent {
  @Input() saleItem: SaleInterface;
  @Output() addaToTheRightShopCar = new EventEmitter<number>();
}
