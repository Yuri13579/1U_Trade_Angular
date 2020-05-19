import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface SellUnit {
  productId?: number;
  count?: number;
  shopId?: number;
}

export interface Shop {
  shopId: number;
  name: string;
  address: string;
}

@Component({
  selector: 'app-sell-goods',
  templateUrl: './sell-goods.component.html',
  styleUrls: ['./sell-goods.component.css']
})

export class SellGoodsComponent implements OnInit {
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
  sells: SellUnit[] = [];
  result: any;
  selectedProductId: number;
  selectedShopId: number;
  selectedShopName: string;
  // selectedShop: {
  //   shopId: number,
  //   name: string
  // };
  selectedShop: Shop;
  // shops: any;
  shops: Shop[] = [];
  selectedProduct: number;
  newSell: SellUnit;
  countInput: 1;
  responseText;
  selectorReadonly: true;

  constructor(private http: HttpClient) {
    // this.sells = Array<{
    //      productId: Number,
    //      count: Number,
    //      shopId:Number
    //    }>;
   }

  ngOnInit() {
    this.getAllShop();
// tslint:disable-next-line: no-unused-expression
    this.getAllProduct();
    this.countInput = 1;
    // this.selectedShop = {
    //   shopId: 0,
    //   name: ''
    // };
    }

    addEmptySell(){
      // console.warn("this.selectedShop" , selectedShopId);
      console.warn("sells" , this.sells);
      this.sells.push({
        productId: this.selectedProductId,
        count: +this.countInput,
        shopId: this.selectedShopId });
      this.hide('sel1');
      this.show('sel2');
      console.warn("this.selectedShopId" , this.selectedShopId);
      console.warn(" this.shops" ,  this.shops);
      this.selectedShopName = this.shops.find(x => x.shopId == this.selectedShopId)?.name;
      console.warn("this.selectedShopName" , this.selectedShopName);
    }

   hide(name: string){
    var elem = document.getElementById(name);
    elem.style.display = 'none';
  }

   show(name: string){
    var elem = document.getElementById(name);
    elem.style.display = 'inline';
  }

  getAllProduct(){
    this.http.get(environment.apiUrl + '/api/Product/GetAllProducts')
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
  // this.newSell = {
  // productId: this.selectedProductId,
  // count: +this.countInput,
  // shopId: this.selectedShopId

  // };
  // console.log(this.newSell.productId);
  this.http.post(environment.apiUrl + '/api/SaleOrders/SellGoods', this.sells
  )
  .toPromise()
.then( (data: any) => {
  console.log(data);
  this.result = JSON.stringify(data.json);
});
  this.show('sel1');
  this.hide('sel2');
}

getAllShop() {
  this.http.get<Shop[]>(environment.apiUrl + '/api/Shop/GetAllShops')
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
