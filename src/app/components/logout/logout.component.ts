import { Component, OnInit } from '@angular/core';
import {AppService} from './../../app.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private readonly appService: AppService) { }

  ngOnInit(): void {
    this.appService.logOut();
  }

}
