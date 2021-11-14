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
import { ApiBearerAuth, ApiParam, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TeamDto } from './dto/team.dto';

@Controller()
@ApiBearerAuth()
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
  getData(@Request() req) {
    return this.service.getData(req.user.userId);
  }
  @Post('team')
  @ApiResponse({
    status: 201,
    description: 'Record inserted',
  })
  async createTeam(@Body() bdy:TeamDto, @Request() req) {
    return this.service.createTeam(bdy, req.user);
  }
  //Route to de-select team
  @Post('remove')
  @ApiResponse({
    status: 201,
    description: 'Record inserted',
  })
  async removeTeam(@Body() bdy:TeamDto, @Request() req) {
    return this.service.deleteTeam(bdy, req.user);
  }

  @Post('remove-source')
  @ApiResponse({
    status: 201,
    description: 'Record inserted',
  })
  async removeSource(@Body() bdy:TeamDto) {
    return this.service.removeSource(bdy);
  }

  @Post('add-source')
  @ApiResponse({
    status: 201,
    description: 'Record inserted',
  })
  async addSource(@Body() bdy:TeamDto) {
    return this.service.addSource(bdy);
  }

  @Get('info')
  @ApiResponse({
    status: 201,
    description: 'Record fetched',
  })
  getinfo() {
    return this.service.getPlayerInfo();
  }
}
