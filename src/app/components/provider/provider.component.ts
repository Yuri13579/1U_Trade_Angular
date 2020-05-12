import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {

  currentHost = 'https://localhost:44307';
  userName: number;
  response: any;
  providers: any;
  deleteID: any;
  postData = {
    name: "",
    phone: 0,
    address:""
  };
  putProviderData = {
    providerId: 0,
    name: "",
    phone: 0,
    address: ""
  };
  providerPost: any;
  isShow = true;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getAllProvider();
  }

  getAllProvider() {
    this.http.get(this.currentHost + '/api/Provider/')
     .subscribe((response2) => {
    this.providers = response2;
    console.log(this.providers);
  }  );
}

postProvider() {
  this.http.post(this.currentHost + '/api/Provider/PostProvider', this.postData,
  ).toPromise()
.then( (data: any) => {
  console.log(data);
  this.providerPost = JSON.stringify(data.json);
});
  this.getAllProvider();
}

deleteProviderById(id) {
   console.log('deleteProviderById '+ id);
   this.http.delete(this.currentHost + '/api/Provider/DeleteProvider/' + id, {
  headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' })
}
).toPromise()
.then( (data: any) => {
console.log(data);
this.providerPost = JSON.stringify(data.json);
});
   this.getAllProvider();
}

putProvider(x) {
console.warn('Put product', x);
this.putProviderData.providerId = x.providerId;
this.putProviderData.name = x.name;
this.putProviderData.phone = x.phone;
this.putProviderData.address = x.address;
console.log(this.putProviderData);
this.http.put(this.currentHost + '/api/Provider/PutProvider', this.putProviderData )
.toPromise()
.then( (data: any) => {
  console.log(data);
});
this.getAllProvider();
}

togglePostProvider() {
  this.isShow = !this.isShow;
}

}
