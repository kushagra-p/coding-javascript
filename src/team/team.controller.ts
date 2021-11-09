import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller()
@UseGuards(JwtAuthGuard)
export class TeamController {
  constructor(private readonly service: TeamService) {}
  @Get('players')
  @ApiResponse({
    status: 201,
    description: 'Record fetched',
  })
  getPlayers() {
    return this.service.getPlayers();
  }
  @Get('team')
  @ApiResponse({
    status: 201,
    description: 'Record fetched',
  })
  @ApiParam({ name: 'userId', type: 'number' })
  getData(@Request() req) {
    return this.service.getData(req.user.userId);
  }
  @Post('team')
  @ApiResponse({
    status: 201,
    description: 'Record inserted',
  })
  async createEmployee(@Body() bdy, @Request() req) {
    console.log(req.user);
    console.log(bdy);
    return this.service.createTeam(bdy, req.user);
  }
}
