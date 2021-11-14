import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'team-ui';
  token:any
  constructor(private service:DataService,router: Router){
  if(this.service.getLoginCheck()==false){
    router.navigate(['login']);
  }
  }
  getToken(){
    return this.token
  }
  ngOnInit(): void {
  }
  ngOnDestroy() {
    this.service.logout();
  }
}
