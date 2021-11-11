import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-view-team',
  templateUrl: './view-team.component.html',
  styleUrls: ['./view-team.component.css']
})
export class ViewTeamComponent implements OnInit {

  displaySource:any
  source:any
  user:any
  token:any
  countryName:any
  roleName:any
  size:any
  arrowPoint:string='down'
  arrowPoint1:string='down'
  filterC:any
  filterR:any
  constructor(private service:DataService) { 
    this.user=service.getLoggedInUser()
    this.token=this.service.getLoggedInToken()
    this.getTeam()
    this.filterC=null
    this.filterR=null
  }
  getTeam(){
    let res=this.service.getTeam(this.token).subscribe((data:any)=>{
      this.source=data.team
      this.displaySource=data.team
      this.size=data.team.length
    })
    return res
  }
  getCountry(){
    this.countryName=(this.source.map((data:any)=>data.country))
    this.countryName=this.countryName.filter((v:any, i:any, a:any) => a.indexOf(v) === i);
    return this.countryName
  }
  getRole(){
    this.roleName=(this.source.map((data:any)=>data.role))
    this.roleName=this.roleName.filter((v:any, i:any, a:any) => a.indexOf(v) === i);
    return this.roleName
  }
  arrow(text:any){
    if(text=='up'){
      this.arrowPoint='down'
    }
    if(text=='down'){
      this.arrowPoint='up'
    }
  }
  arrow1(text:any){
    if(text=='up'){
      this.arrowPoint1='down'
    }
    if(text=='down'){
      this.arrowPoint1='up'
    }
  }
  showCountry(country:any){
    this.filterC=country
    if(country=='All'){
      this.getTeam()
    }else{
      this.displaySource=this.source.filter((data:any)=>{
        if(data.country==country){
          return data
        }
      })
    }
  }
  showRole(role:any){
    this.filterR=role
    if(role=='All'){
      this.getTeam()
    }else{
      this.displaySource=this.source.filter((data:any)=>{
        if(data.role==role){
          return data
        }
      })
    }
  }
  clear(){
    this.getTeam()
    this.filterC=null
    this.filterR=null
  }
  ngOnInit(): void {
    this.token=this.service.getLoggedInToken()
    this.user=this.service.getLoggedInUser()
    this.getTeam()
  }

}
