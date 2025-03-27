import { Injectable } from '@nestjs/common';
import { DefaultResponseDTO } from './dto';
import { appName } from './utils';

@Injectable()
export class AppService {
  getHello(): DefaultResponseDTO {
    return { message: `Welcome to the ${appName}` };
  }
}
