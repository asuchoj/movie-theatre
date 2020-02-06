import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ShopCartComponent } from './shop-cart.component';
import { ShopCartService } from '../../../../core/services/shop-cart.service';
import { ProductItem } from '../../../../core/interfaces/productItem';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShopCartServiceTest {
  productItemInShop = [{id: 1, name: 'Popcorn', price: 3, count: 1, totalPrice: 3}];
  totalPrice = 3;

  addItem(item: ProductItem) {
    this.productItemInShop[0].count++;
  }

  removeItem(item: ProductItem) {
    this.productItemInShop[0].count--;
  }

  getItems() {
    return of(this.productItemInShop);
  }

  getTotalPrice() {
    return of(this.totalPrice);
  }

  buyItems() {
    this.productItemInShop.length = 0;
    return of(this.productItemInShop);
  }

  clear() {
    this.productItemInShop.length = 0;
    return of(this.productItemInShop);
  }
}

describe('ShopCartComponent', () => {
  let shopCartComponent: ShopCartComponent;
  let fixture: ComponentFixture<ShopCartComponent>;
  // tslint:disable-next-line:prefer-const
  let shopCartServiceStub: any;

  beforeEach(async(() => {
    shopCartServiceStub = new ShopCartServiceTest();
    TestBed.configureTestingModule({
      declarations: [ ShopCartComponent ],
      providers: [ {provide: ShopCartService, useValue: shopCartServiceStub }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopCartComponent);
    shopCartComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(shopCartComponent).toBeTruthy();
  });

  it('should add one product to shop-cart', () => {
    expect(JSON.stringify(shopCartComponent.merchandises)).toEqual(JSON.stringify(shopCartServiceStub.productItemInShop));
  });

  it('should be right one product price', () => {
    const oneProductPrice = 3;

    expect(shopCartComponent.totalPrice).toEqual(oneProductPrice);
  });

  it('should work add product btn', () => {
    const resultProductCount = 4;

    const buyBtn = fixture.debugElement.query(By.css('.add-product-btn'));

    buyBtn.triggerEventHandler('click', null);
    buyBtn.triggerEventHandler('click', null);
    buyBtn.triggerEventHandler('click', null);

    expect(shopCartComponent.merchandises[0].count).toEqual(resultProductCount);
  });

  it('should work remove product btn', () => {
    const resultProductCount = 0;

    const buyBtn = fixture.debugElement.query(By.css('.remove-product-btn'));
    buyBtn.triggerEventHandler('click', null);

    expect(shopCartComponent.merchandises[0].count).toEqual(resultProductCount);
  });

  it('should work buy btn', () => {
    const resultProductCount = 0;

    const buyBtn = fixture.debugElement.query(By.css('.buy-products-btn'));
    buyBtn.triggerEventHandler('click', null);

    expect(shopCartComponent.merchandises.length).toEqual(resultProductCount);
  });

  it('should work clear btn', () => {
    const resultProductCount = 0;

    const buyBtn = fixture.debugElement.query(By.css('.clear-btn'));
    buyBtn.triggerEventHandler('click', null);

    expect(shopCartComponent.merchandises.length).toEqual(resultProductCount);
  });
});
