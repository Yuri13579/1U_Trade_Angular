import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface SellUnit {
  productId?: number;
  count?: number;
  shopId?: number;
}

@Component({
  selector: 'app-sell-goods',
  templateUrl: './sell-goods.component.html',
  styleUrls: ['./sell-goods.component.css']
})

export class SellGoodsComponent implements OnInit {
  currentHost = 'https://localhost:44307';
  currentSells: any;
  allProducts: [
    {
      productId: number,
      name: string,
      priseSale: number
    }
  ];
  allShops: [
    {
      shopId: number,
      name: string,
      address: string,
    }
  ];
  result: any;
  selectedProductId: number;
  selectedShopId: number;
  shops: any;
  selectedProduct: number;
  selectedShop: number;
  newSell: SellUnit;
  countInput: 1;
  responseText;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getAllShop();
// tslint:disable-next-line: no-unused-expression
    this.getAllProduct();
    this.countInput = 1;
  }

  getAllProduct(){
    this.http.get(this.currentHost + '/api/Product/GetAllProducts')
     .subscribe((response2: any) =>
  {
    this.allProducts = response2;
    console.log(this.allProducts);
  }  )
}

selected(Id){
  console.log(Id);
}

postSell() {
  console.log("start postSell"+ this.countInput);
  this.newSell = {
  productId: this.selectedProductId,
  count: +this.countInput,
  shopId: this.selectedShopId,
 };
  console.log(this.newSell.productId);
  this.http.post(this.currentHost + '/api/SaleOrders/SellGoods', this.newSell
  )
  .toPromise()
.then( (data: any) => {
  console.log(data);
  this.result = JSON.stringify(data.json);
});

}

getAllShop() {
  this.http.get(this.currentHost + '/api/Shop/GetAllShops')
   .subscribe((response2) => {
  this.shops = response2;
  console.log(this.shops);
});
}

onKey(event: any) { // without type info
  console.log(this.countInput);
  this.countInput = event.target.value;
}

countPlus(){
  this.countInput += 1;
}

countMinus(){
  this.countInput -= 1;
}


}
