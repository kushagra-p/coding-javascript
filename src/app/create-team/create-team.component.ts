import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {
  dataSource!: any[];
  dataSourceTeam!:any
  dataSourceDisplay!: any[];
  navLimit=5;
  index=5;
  dataSourceDisplayTeam!: any;
  navLimitTeam=5;
  indexTeam=5;
  pushIndex=0
  pushIndexDisplay=0
  pushIndexDisplayTeam=0
  pushIndexTeam=0
  disable=true
  token:any
  viewTeam:any
  viewDisplayTeam:any
  size=0
  selectedTeam=0
  constructor(private service:DataService,
    private app:AppComponent ) { 
      this.dataSource=[{name:"Player 1"},{name:"Player 2"},{name:"Player 3"},
        {name:"Player 4"},{name:"Player 5"},{name:"Player 6"},
        {name:"Player 7"},{name:"Player 8"},{name:"Player 9"},{name:"Player 10"},{name:"Player 11"}];
    this.token=this.service.getLoggedInToken()
    this.getAll()
    this.getTeam()
    
    this.dataSourceDisplay=this.dataSource.slice(0,this.navLimit)
  
  }
  //Fucntion to fetch all players
getAll(){
  let res=this.service.getAll(this.token).subscribe(data=>{
    this.dataSourceTeam=data
    this.dataSourceDisplayTeam=this.dataSourceTeam.slice(0,this.navLimitTeam)
  })
  return res
}
//Function to fetch players for a team
getTeam(){
  let res=this.service.getTeam(this.token).subscribe((data:any)=>{
    for(let i=0;i<11;i++){
      if(i<data.team.length){
        this.dataSource[i]=data.team[i]
        this.size++
      }
      else{
        this.dataSource[i]={name:'Player '+(i+1).toString()}
      }
    }
  
    this.dataSourceDisplay=this.dataSource.slice(0,this.navLimit)
  })
  return res
}
//Function to navigate with arrow
next(n:number){
if(n==1){
  this.dataSourceDisplay=[]
  if(this.navLimit==0){
    for(this.navLimit;this.navLimit<this.index;this.navLimit++){
      this.dataSourceDisplay.push(this.dataSource[this.navLimit])
    }
  }else if(this.navLimit==5){
    for(this.navLimit;this.navLimit<10;this.navLimit++){
      this.dataSourceDisplay.push(this.dataSource[this.navLimit])
    }
  }else{
    for(this.navLimit;this.navLimit<this.dataSource.length;this.navLimit++){
      this.dataSourceDisplay.push(this.dataSource[this.navLimit])
    }
  }
  if(this.navLimit==this.dataSource.length){
    this.navLimit=0;
  }
}
if(n==-1){
  this.dataSourceDisplay=[]
  if(this.navLimit==5){
    for(this.navLimit;this.navLimit<10;this.navLimit++){
      this.dataSourceDisplay.push(this.dataSource[this.navLimit])
    }
  }else if(this.navLimit==0){
    for(this.navLimit;this.navLimit<this.index;this.navLimit++){
      this.dataSourceDisplay.push(this.dataSource[this.navLimit])
    }
  }else{
    for(this.navLimit;this.navLimit<this.dataSource.length;this.navLimit++){
      this.dataSourceDisplay.push(this.dataSource[this.navLimit])
    }
  }
  if(this.navLimit==this.dataSource.length){
    this.navLimit=0;
  }
}
}
//Function to navigate with arrow
nextTeam(n:number){
  if(n==1){
    this.dataSourceDisplayTeam=[]
    let c=0;
    if(this.navLimitTeam==0){
      let limit=this.dataSourceTeam.length>this.indexTeam?this.indexTeam:this.dataSourceTeam.length
      for(this.navLimitTeam;this.navLimitTeam<limit;this.navLimitTeam++){
        this.dataSourceDisplayTeam.push(this.dataSourceTeam[this.navLimitTeam])
      }
    }else if(this.navLimitTeam==5){
      let limit=this.dataSourceTeam.length>10?10:this.dataSourceTeam.length
      for(this.navLimitTeam;this.navLimitTeam<limit;this.navLimitTeam++){
        this.dataSourceDisplayTeam.push(this.dataSourceTeam[this.navLimitTeam])
      }
    }else{
      for(this.navLimitTeam;this.navLimitTeam<this.dataSourceTeam.length;this.navLimitTeam++){
        this.dataSourceDisplayTeam.push(this.dataSourceTeam[this.navLimitTeam])
      }
    }
    if(this.navLimitTeam==this.dataSourceTeam.length){
      this.navLimitTeam=0;
    }
  }
  if(n==-1){
    this.dataSourceDisplayTeam=[]
    if(this.navLimitTeam==5){
      let limit=this.dataSourceTeam.length>10?10:this.dataSourceTeam.length
      for(this.navLimitTeam;this.navLimitTeam<limit;this.navLimitTeam++){
        this.dataSourceDisplayTeam.push(this.dataSourceTeam[this.navLimitTeam])
      }
    }else if(this.navLimitTeam==0){
      let limit=this.dataSourceTeam.length>this.indexTeam?this.indexTeam:this.dataSourceTeam.length
      for(this.navLimitTeam;this.navLimitTeam<limit;this.navLimitTeam++){
        this.dataSourceDisplayTeam.push(this.dataSourceTeam[this.navLimitTeam])
      }
    }else{
      for(this.navLimitTeam;this.navLimitTeam<this.dataSourceTeam.length;this.navLimitTeam++){
        this.dataSourceDisplayTeam.push(this.dataSourceTeam[this.navLimitTeam])
      }
    }
    if(this.navLimitTeam==this.dataSourceTeam.length){
      this.navLimitTeam=0;
    }
  }
  }
  //Function to select teams
  selected(item:any):any{
if(this.dataSource.length<=11)
{this.dataSourceDisplayTeam=this.dataSourceDisplayTeam.filter((data:any)=>{
  if(data.id!=item.id){
    return data
  }
})
this.dataSourceTeam=this.dataSourceTeam.filter((data:any)=>{
  if(data.id!=item.id){
    return data
  }
})
this.dataSourceDisplay[this.pushIndexDisplay]=item
this.pushIndexDisplay++
if(this.pushIndexDisplay==6&&this.navLimit==5){
  this.pushIndexDisplay=0
}else if(this.pushIndexDisplay==5&&this.navLimit==0){
  this.pushIndexDisplay=0
}
this.dataSource[this.pushIndex]=item
this.pushIndex++
}
this.service.team(this.token,item).subscribe((data:any)=>{
  for(let i=0;i<11;i++){
    if(i<data.team.length){
      this.dataSource[i]=data.team[i]
      this.size++
    }
    else{
      this.dataSource[i]={name:'Player '+(i+1).toString()}
    }
  }

  this.dataSourceDisplay=this.dataSource.slice(0,this.navLimit)
})
  }
  //Function to de-select teams
selectedItem(item:any){
  if(item.image){
  this.dataSourceDisplay=this.dataSourceDisplay.filter((data:any)=>{
    if(data.id!=item.id){
      return data
    }
  })
  this.dataSource=this.dataSource.filter((data:any)=>{
    if(data.id!=item.id){
      return data
    }
  })
  this.dataSourceDisplayTeam[this.pushIndexDisplayTeam]=item
this.pushIndexDisplayTeam++
if(this.pushIndexDisplayTeam==5&&this.navLimitTeam==5){
  this.pushIndexDisplayTeam=0
}else if(this.pushIndexDisplayTeam==5&&this.navLimitTeam==0){
  this.pushIndexDisplayTeam=0
}

this.dataSourceTeam.push(item)
  this.service.remove(this.token,item).subscribe((data:any)=>{
    
    for(let i=0;i<11;i++){
      if(i<data.team.length){
        this.dataSource[i]=data.team[i]
        this.size++
      }
      else{
        this.dataSource[i]={name:'Player '+(i+1).toString()}
      }
    }
  
    this.dataSourceDisplay=this.dataSource.slice(0,this.navLimit)
  })
}
}

  ngOnInit(): void {
    this.token=this.service.getLoggedInToken()
    this.getAll()
    this.getTeam()
  }

}
