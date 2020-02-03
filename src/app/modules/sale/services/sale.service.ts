import {Injectable} from '@angular/core';
import {SaleInterface} from '../../../core/interfaces/sale.interface';
import {Sweets} from '../../../core/mocks/sweets';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  sweets: SaleInterface[] = Sweets;

  getSweets(): Observable<SaleInterface[]> {
    return of(this.sweets);
  }
}
