import { Injectable } from '@nestjs/common';
import { DefaultResponseDTO } from './dto';

@Injectable()
export class AppService {
  getHello(): DefaultResponseDTO {
    return { message: 'Welcome to Oakslab Startup API!' };
  }
}
