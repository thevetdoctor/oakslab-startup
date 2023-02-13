import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DefaultResponseDTO } from './dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): DefaultResponseDTO {
    return this.appService.getHello();
  }
}
