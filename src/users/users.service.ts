import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      userId: 1,
      username: 'john.smith@test.com',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria.rose@test.com',
      password: 'guess',
    },
  ];
  //Function to find user
  async findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }
  //Function to register new user
  async registerUser(user) {
    let id = this.users[this.users.length - 1]['userId']
    let record = {
      userId: id + 1,
      username: user.username,
      password: user.password
    }
    this.users.push(record)
    return {
      userId: record.userId,
      username: record.username
    }
  }
}
