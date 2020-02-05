import {Injectable} from '@angular/core';
import {ProductItem} from '../../../core/interfaces/productItem';
import {Products} from '../../../core/mocks/products';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products: ProductItem[] = Products;

  getProducts(): Observable<ProductItem[]> {
    return of(this.products);
  }
}
