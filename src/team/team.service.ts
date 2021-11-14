import { Body, Injectable } from '@nestjs/common';
import { players, playersCopy } from './data-sorce/data-source';
import { AvatarGenerator } from 'random-avatar-generator';
import * as _ from "lodash"

@Injectable()
export class TeamService {
  player=players;
   generator = new AvatarGenerator();
   constructor() {
   }
  addSource(bdy: any) {
    if(!(this.player.find(o=>o.id==bdy.id))){
    this.player.push(bdy)
  }
    return this.player
  }
  removeSource(bdy: any) {
    this.player=this.player.filter(data=>{
      if(data.id.toString()!=bdy.id.toString()){
        return data
      }
    })
    return this.player
  }
  teamInfo = [{
    user: {
      userId: '',
      username: '',
    },
    team: [],
  }];
  getPlayers() {
    return this.player;
  }
  getData(id: any) {
    let res=this.teamInfo.filter(data=>{
    if (data['user']['userId'].toString() === id.toString()) {
      return data;
    }
    })
    return res[0]
  }

  createTeam(bdy, user) {
    let team;
    for (let data of this.player) {
      if (data.id.toString() === bdy.id.toString()) {
        team = data;
      }
    }
    let res=this.teamInfo.filter(data=>{
      if(data['user']['userId']===user.userId){
        data['user']['userId'] = user.userId;
        data['user']['username'] = user.username;
        data['team'].push(team);
        return data;
        }
    })
    if(res.length==0){
      let obj={
        user: {
          userId: user.userId,
          username: user.username,
        },
        team: [team],
      }
      res.push(obj)
      this.teamInfo.push(obj)
    }
    return res[0]
  }
  //Funtion to de-select team
  deleteTeam(bdy,user){
    let team;
    for(let data of this.player){
      if (data.id.toString() === bdy.id.toString()) {
        team = data;
      }
    }
    let res=this.teamInfo.filter(data=>{
      if(data['user']['userId']===user.userId){
        data['team']=data['team'].filter(item=>{
          if(item.id!=team.id){
            return item
          }
        })
        return data
        }
    })
    return res[0]
  }
  getPlayerInfo(){
    let res=_.clone(playersCopy)
    return res
  }
}
