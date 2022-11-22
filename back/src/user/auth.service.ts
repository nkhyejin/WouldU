import * as jwt from 'jsonwebtoken';
import { Inject, Injectable } from '@nestjs/common';

// import authConfig from 'src/config/authConfig';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  // constructor(
  //     @Inject(authConfig.KEY) private config: ConfigType<typeof authConfig>,
  // ){}
  login(email: string, password: string) {
    const payload = { id: email, password };
    return jwt.sign(payload, this.config.jwtSecret, {
      expiresIn: '1d',
    });
  }
}
