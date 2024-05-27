import { Controller, Get } from '@nestjs/common';
import { ConfigService } from './config.service';

@Controller('config')
export class ConfigController {
  constructor(private configService: ConfigService) {}

  @Get('areas')
  getAreas() {
    return this.configService.getAreas();
  }

  @Get('priorities')
  getPriorities() {
    return this.configService.getPriorities();
  }
}
