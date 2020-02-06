import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products.service';
import { Products } from '../../../core/mocks/products';

describe('ProductsService', () => {
  let productsService: ProductsService;
  const products = Products;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    productsService = TestBed.get(ProductsService);
  });

  it('should be created', () => {
    expect(productsService).toBeTruthy();
  });

  it('get products works', (done) => {
    productsService.getProducts().subscribe(items => {
      expect(JSON.stringify(items)).toEqual(JSON.stringify(products));
      done();
    });
  });
});


