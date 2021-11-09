import { Injectable } from '@nestjs/common';

@Injectable()
//Service for health check
export class AppService {
  getHealth(): string {
    return `app-name:  team-api`;
  }
}
