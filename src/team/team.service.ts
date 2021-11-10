import { Injectable } from '@nestjs/common';
import { players } from './data-sorce/data-source';

@Injectable()
export class TeamService {
  teamInfo = [{
    user: {
      userId: '',
      username: '',
    },
    team: [],
  }];
  getPlayers() {
    return players;
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
    for (let data of players) {
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
    for(let data of players){
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
}
