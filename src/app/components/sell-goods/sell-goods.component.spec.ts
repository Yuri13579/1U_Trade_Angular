import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellGoodsComponent } from './sell-goods.component';

describe('SellGoodsComponent', () => {
  let component: SellGoodsComponent;
  let fixture: ComponentFixture<SellGoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellGoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
