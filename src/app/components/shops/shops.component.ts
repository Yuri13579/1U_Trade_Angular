import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {
  currentHost = 'https://localhost:44307';
  shops: any;
  putProductData = {
    shopId: 0,
    name: "",
    address: ""
  };
  postData = {
    shopId: 0,
    name: "",
    address: ""
  };
  shopPost: any;
  isShow = true;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getAllShop();
  }

  getAllShop() {
    this.http.get(this.currentHost + '/api/Shop/GetAllShops')
     .subscribe((response2) => {
    this.shops = response2;
    console.log(this.shops);
  }  );
}

putShop(x) {
  console.warn('Put Shop', x);
  this.putProductData.shopId = x.shopId;
  this.putProductData.name = x.name;
  this.putProductData.address = x.address;
  console.log(this.putProductData);
  this.http.put(this.currentHost + '/api/Shop/PutShop', this.putProductData , {
    headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' })
})
  .toPromise()
  .then( (data: any) => {
    console.log(data);
  });
  this.getAllShop();
}

deleteShopById(id) {
  console.log('deleteShopById '+ id);
  this.http.delete(this.currentHost + '/api/Shop/DeleteShop/' + id, {
 headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' })
}
).toPromise()
.then( (data: any) => {
console.log(data);
this.shopPost = JSON.stringify(data.json);
});
  this.getAllShop();
}

postShop() {
  this.http.post(this.currentHost + '/api/Shop/PostShop', this.postData,
  ).toPromise()
.then( (data: any) => {
  console.log(data);
  this.shopPost = JSON.stringify(data.json);
});
  this.getAllShop();
}

togglePostShop() {
  this.isShow = !this.isShow;
}
}
