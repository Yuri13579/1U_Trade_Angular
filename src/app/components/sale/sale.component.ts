import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})


export class SaleComponent implements OnInit {
  currentHost = 'https://localhost:44307';
  loggedIn = true;
  currentSales: any;
  items;
  tax: any;
  taxableValue: string;
  constructor(private http: HttpClient){

  }

  ngOnInit() {
    this.getAllSale();
  }

// class SaleDTO {
//     saleOrderID: number;
//     dataTime: Date;
//     saleOrderDetailId: number;
//     saleOrderId: number;
//     productId: number;
//     productBarcode: number;
//     productName: string;
//     productDescription: string;
//     count: number;
//     priceCost: number;
//     priseSale: number;
//     summ: number;
//     shopId: number;
//     shopName: string;
//     shopAddress: string;

//     constructor(
//     saleOrderID: number,
//    dataTime: Date,
//     saleOrderDetailId: number,
//     saleOrderId: number,
//     productId: number,
//     productBarcode: number,
//     productName: string,
//     productDescription: string,
//     count: number,
//     priceCost: number,
//     priseSale: number,
//     summ: number,
//     shopId: number,
//     shopName: string,
//     shopAddress: string) {
//       this.saleOrderID = saleOrderID;
//      this.dataTime = dataTime;
//       this.saleOrderDetailId = saleOrderDetailId;
//       this.saleOrderId = saleOrderId;
//       this.productId = productId;
//       this.productBarcode = productBarcode;
//       this.productName = productName;
//       this.productDescription = productDescription;
//       this.count = count;
//       this.priceCost = priceCost;
//       this.priseSale = priseSale;
//       this.summ = summ;
//       this.shopId = shopId;
//       this.shopName = shopName;
//       this.shopAddress = shopAddress;
//     }
//   }

getAllSale() {
  // this.http.get('https://api.github.com/users/'+ this.userName)
  this.http.get(this.currentHost + '/api/SaleOrders/ALLSales')
      .subscribe((response2) => {
     this.currentSales = response2;
     console.log(this.currentSales);
   }  );
 }

 formatCurrency_TaxableValue(event)
  {
    var uy = new Intl.NumberFormat('en-US',{style: 'currency', currency:'USD'}).format(event.target.value);
    this.tax = event.target.value;
    this.taxableValue = uy;
  }
}
