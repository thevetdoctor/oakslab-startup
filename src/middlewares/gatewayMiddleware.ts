import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { apiGatewayUrl, axiosErrorLogic, encryptionKey } from 'src/utils';
const { AES, enc } = require('crypto-js');

@Injectable()
export class GatewayAuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      // Exclude GraphQL Playground and Introspection Queries
      const hideDefault = req.body.operationName === 'IntrospectionQuery';
      if ((req.method === 'GET' && req.url === '/') || hideDefault) {
        return next();
      } else {
        const gatewayUrl = apiGatewayUrl + '/auth/validate';
        const token = req.headers.authorization; // Get token from request
        console.log('token', token, gatewayUrl);
        if (!token) {
          throw new UnauthorizedException('No token provided', {
            cause: new Error('Token is missing from the request headers'),
          });
        }

        // Call the API Gateway for validation
        const response = await axios.get(gatewayUrl, {
          headers: { 'x-api-key': token.split(' ')[1] },
        });

        if (response.status === 200) {
          const decrypted = AES.decrypt(
            response.data.data,
            encryptionKey,
          ).toString(enc.Utf8);
          req['user'] = decrypted; // Attach user data from the gateway
          console.log('gateway decrypted', decrypted);
          return next();
        }
      }
    } catch (error) {
      console.log(axios.isAxiosError(error), error?.message);

      if (axios.isAxiosError(error)) {
        const { status, message } = axiosErrorLogic(error);
        console.log(status, message);
        throw new UnauthorizedException(message || 'Invalid authentication');
      } else if (error.message.includes('words')) {
        throw new UnauthorizedException('Encryption Failed');
      } else {
        throw new UnauthorizedException(error || 'Invalid authentication');
      }
    }
  }
}
