import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductItemComponent } from './product-item.component';
import { Component } from '@angular/core';
import { ProductItem } from '../../../../core/interfaces/productItem';
import { By } from '@angular/platform-browser';

const TestProductItem: ProductItem = {id: 1, name: 'Popcorn', price: 3, count: 1};

@Component({
  template: `
    <app-product-item [saleItem]="item" (adaToShopCar)="addToShopCar($event)"></app-product-item>
  `
})
class TestProductItemComponent {
  public item: ProductItem = TestProductItem;
  public itemId: number;
  public addToShopCar(id: number) {
    this.itemId = id;
  }
}

describe('ProductItemComponent', () => {
  let testHost: TestProductItemComponent;
  let fixture: ComponentFixture<TestProductItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductItemComponent, TestProductItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestProductItemComponent);
    testHost = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(testHost).toBeTruthy();
  });

  it('should pull right product', () => {
    fixture.detectChanges();
    expect(JSON.stringify(testHost.item.id)).toEqual(JSON.stringify(TestProductItem.id));
  });

  it('should return right itemId', () => {
    fixture.detectChanges();
    const itemId = 1;

    const buyBtn = fixture.debugElement.query(By.css('.add-to-cart-btn'));
    buyBtn.triggerEventHandler('click', null);

    expect(testHost.itemId).toEqual(itemId);
  });
});
