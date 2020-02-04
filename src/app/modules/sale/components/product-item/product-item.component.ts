import {Component, EventEmitter, Input, Output} from '@angular/core';

import {ProductItem} from '../../../../core/interfaces/productItem';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input() saleItem: ProductItem;
  @Output() adaToShopCar = new EventEmitter<number>();
}
