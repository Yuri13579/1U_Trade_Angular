import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  currentHost = 'https://localhost:44307';
  persons: any;
  putPersonData = {
    personId: 0,
    firstName: "",
    lastName: "",
    displayName: "",
    emailAddress: "",
    mobilePhone:"",
    genderSysCodeUniqueId:0,
    dob: new Date()
  };
  postData = {
    personId: 0,
    firstName: "",
    lastName: "",
    displayName: "",
    emailAddress: "",
    mobilePhone:"",
    genderSysCodeUniqueId:0,
    dob: new Date()
  };
  personPost: any;
  isShow = true;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getAllPerson();
  }

  getAllPerson() {
    this.http.get(this.currentHost + '/api/Person')
     .subscribe((response2) => {
    this.persons = response2;
    console.log(this.persons);
  }  );
}

putPerson(x) {
  console.warn('Put Shop', x);
  this.putPersonData.personId = x.personId;
  this.putPersonData.firstName = x.firstName;
  this.putPersonData.lastName = x.lastName;
  console.log(this.putPersonData);
  this.http.put(this.currentHost + '/api/Person/PutPerson', this.putPersonData , {
    headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' })
})
  .toPromise()
  .then( (data: any) => {
    console.log(data);
  });
  this.getAllPerson();
}

deletePersonById(id) {
  console.log('deletePersonById '+ id);
  this.http.delete(this.currentHost + '/api/Person/' + id, {
 headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' })
}
).toPromise()
.then( (data: any) => {
console.log(data);
this. personPost = JSON.stringify(data.json);
});
  this.getAllPerson();
}

postPerson() {
  this.http.post(this.currentHost + '/api/Person', this.postData,
  ).toPromise()
.then( (data: any) => {
  console.log(data);
  this. personPost = JSON.stringify(data.json);
});
  this.getAllPerson();
}

togglePostPerson() {
  this.isShow = !this.isShow;
}
}
