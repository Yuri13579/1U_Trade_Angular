import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  currentHost = 'https://localhost:44307';
  userName: number;
  response: any;
  products: any;
  deleteID: any;
  postData = {
    name: "",
    description: "",
    barcode: 0,
    priceCost: 0,
    priseSale: 0
  };
  putProductData = {
    productId: 0,
    name: "",
    description: "",
    barcode: 0,
    priceCost: 0,
    priseSale: 0
  };
  productPost: any;
  isShow = true;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getAllProduct();
  }

  getAllProduct() {
    this.http.get(this.currentHost + '/api/Product/GetAllProducts')
     .subscribe((response2) => {
    this.products = response2;
    console.log(this.products);
  }  );
}

    postProduct() {
      this.http.post(this.currentHost + '/api/Product/AddProduct', this.postData,
      ).toPromise()
    .then( (data: any) => {
      console.log(data);
      this.productPost = JSON.stringify(data.json);
    });
      this.getAllProduct();
    }


  deleteProductById(id) {
       console.log('deleteProductById '+ id);
       this.http.delete(this.currentHost + '/api/Product/Delete/' + id, {
      headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' })
    }
    ).toPromise()
  .then( (data: any) => {
    console.log(data);
    this.productPost = JSON.stringify(data.json);
  });
       this.getAllProduct();
 }

  putProduct(x) {
    console.warn('Put product', x);
    this.putProductData.productId = x.productId;
    this.putProductData.name = x.name;
    this.putProductData.description = x.description;
    this.putProductData.barcode = x.barcode;
    this.putProductData.priceCost = x.priceCost;
    this.putProductData.priseSale = x.priseSale;
    console.log(this.putProductData);
    this.http.put(this.currentHost + '/api/Product/PutProduct', this.putProductData )
    .toPromise()
    .then( (data: any) => {
      console.log(data);
    });
    this.getAllProduct();
  }

  deleteProduct(){
    this.http.delete(this.currentHost + '/api/Product/Delete/' + this.deleteID,
    {
      headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' })
  }
    ).toPromise()
  .then( (data: any) => {
    console.log(data);
    this.productPost = JSON.stringify(data.json);
  });
    this.getAllProduct();
}

getProduct(){
  this.http.get(this.currentHost + '/api/Product/GetProductById/'+ this.userName)
   .subscribe((response) => {
  this.response = response;
  console.log(this.response);
}  );
  this.getAllProduct();
}

togglePostProduct() {
  this.isShow = !this.isShow;
}
}
