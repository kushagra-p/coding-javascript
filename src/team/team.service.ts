import { Injectable } from '@nestjs/common';
import { players } from './data-sorce/data-source';

@Injectable()
export class TeamService {
  teamInfo = {
    user: {
      userId: '',
      username: '',
    },
    team: [],
  };
  getPlayers() {
    return players;
  }
  getData(id: any) {
    if (this.teamInfo['user']['userId'].toString() === id.toString()) {
      return this.teamInfo;
    }
  }

  createTeam(bdy, user) {
    let team;
    for (let data of players) {
      if (data.id.toString() === bdy.id.toString()) {
        team = data;
      }
    }
    this.teamInfo['user']['userId'] = user.userId;
    this.teamInfo['user']['username'] = user.username;
    this.teamInfo['team'].push(team);
    return this.teamInfo;
  }
}
