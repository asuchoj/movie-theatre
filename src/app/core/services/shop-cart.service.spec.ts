import { TestBed } from '@angular/core/testing';
import { ShopCartService } from './shop-cart.service';
import { ProductItem } from '../interfaces/productItem';

describe('ShopCartService', () => {
  const TestPopсornProduct: ProductItem = {id: 1, name: 'Popcorn', price: 3, count: 1};
  const TestSnickersProduct: ProductItem = {id: 2, name: 'Snickers', price: 4, count: 1};
  const TestSodaProduct: ProductItem = {id: 3, name: 'Soda', price: 2, count: 1};

  let service: ShopCartService;


  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(ShopCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('adding one product works', (done) => {
    service.addItem(TestPopсornProduct);

    service.getItems().subscribe( (item) => {
      expect(item[0].totalPrice).toBe(3);
      done();
    });
  });

  it('adding two product work', (done) => {
    service.addItem(TestPopсornProduct);
    service.addItem(TestPopсornProduct);
    service.addItem(TestPopсornProduct);
    service.getItems().subscribe( (item) => {
      expect(item[0].totalPrice).toBe(9);
      done();
    });
  });

  it('removing product works', (done) => {
    const TestPopcornPriceTest = 3 * TestPopсornProduct.price - TestPopсornProduct.price;
    service.addItem(TestPopсornProduct);
    service.addItem(TestPopсornProduct);
    service.addItem(TestPopсornProduct);
    service.removeItem(TestPopсornProduct);
    service.getItems().subscribe( (item) => {
      expect(item[0].totalPrice).toBe(TestPopcornPriceTest);
      done();
    });
  });

  it('getting total price works', (done) => {
    const TotalPriceTest = TestPopсornProduct.price + TestSnickersProduct.price + TestSodaProduct.price;
    service.addItem(TestPopсornProduct);
    service.addItem(TestSnickersProduct);
    service.addItem(TestSodaProduct);
    service.getTotalPrice().subscribe( (item) => {
      expect(item).toBe(TotalPriceTest);
      done();
    });
  });

  it('total price with five discount snickers work', (done) => {
    const TotalPriceWithFiveSnickersTest = 3 * TestPopсornProduct.price + 3 * TestSnickersProduct.price + TestSodaProduct.price;

    for (let i = 0; i < 3; i++) {
      service.addItem(TestPopсornProduct);
    }

    for (let i = 0; i < 5; i++) {
      service.addItem(TestSnickersProduct);
    }

    service.addItem(TestSodaProduct);

    service.getTotalPrice().subscribe( (item) => {
      expect(item).toBe(TotalPriceWithFiveSnickersTest);
      done();
    });
  });

  it('total price count right with discount with eight snickers work', (done) => {
    const TotalPriceWithFiveSnickersTest = 3 * TestPopсornProduct.price + 6 * TestSnickersProduct.price + TestSodaProduct.price;

    for (let i = 0; i < 3; i++) {
      service.addItem(TestPopсornProduct);
    }

    for (let i = 0; i < 8; i++) {
      service.addItem(TestSnickersProduct);
    }

    service.addItem(TestSodaProduct);

    service.getTotalPrice().subscribe( (item) => {
      expect(item).toBe(TotalPriceWithFiveSnickersTest);
      done();
    });
  });

  it('total price with ten discount snickers work', (done) => {
    const TotalPriceWithTenSnickersTest = 3 * TestPopсornProduct.price + 6 * TestSnickersProduct.price + TestSodaProduct.price;

    for (let i = 0; i < 3; i++) {
      service.addItem(TestPopсornProduct);
    }

    for (let i = 0; i < 10; i++) {
      service.addItem(TestSnickersProduct);
    }

    service.addItem(TestSodaProduct);

    service.getTotalPrice().subscribe( (item) => {
      expect(item).toBe(TotalPriceWithTenSnickersTest);
      done();
    });
  });

  it('buying products work', (done) => {
    service.addItem(TestPopсornProduct);
    service.addItem(TestSnickersProduct);
    service.addItem(TestSodaProduct);
    service.buyItems();

    service.getTotalPrice().subscribe( (item) => {
      expect(item).toBe(0);
      done();
    });

    service.getItems().subscribe( (item) => {
      expect(item.length).toBe(0);
      done();
    });
  });

  it('clearing products work', (done) => {
    service.addItem(TestPopсornProduct);
    service.addItem(TestSnickersProduct);
    service.addItem(TestSodaProduct);
    service.clear();

    service.getTotalPrice().subscribe( (item) => {
      expect(item).toBe(0);
      done();
    });

    service.getItems().subscribe( (item) => {
      expect(item.length).toBe(0);
      done();
    });
  });
});


