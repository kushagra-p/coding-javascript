import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTreeFlatDataSource } from '@angular/material/tree';
import { Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-team-toolbar',
  templateUrl: './team-toolbar.component.html',
  styleUrls: ['./team-toolbar.component.css']
})
export class TeamToolbarComponent implements OnInit {
links=["Create Team","View Team"];
loginCheck:any
  navLinks!: any[];
  subscription!: Subscription
  token:any
  constructor(private router:Router, private service:DataService) {
    this.token=this.service.getLoggedInToken()
    this.loginCheck=this.service.getLoginCheck().toString()
    this.navLinks=[
      {
        label:'Create Team',
        link: './team/create',
        index:0
      },
      {
        label:'View Team',
        link: './team/view',
        index:1
      }
    ]
   }
   login(){
    this.loginCheck=this.service.getLoginCheck().toString()
   }
logout(){
  this.service.logout()
  this.loginCheck=this.service.getLoginCheck().toString()
}
loginbutton(event:any){
  const obj:LoginComponent=event
  obj.loginEmitter.subscribe((data:any)=>{
    this.loginCheck=data.check.toString()
  })
}
  ngOnInit(): void {
    this.loginCheck=this.service.getLoginCheck()
    this.token=this.service.getLoggedInToken()
    this.loginCheck=this.service.getLoginCheck().toString()
  }

}
