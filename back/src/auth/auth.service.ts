import * as bcrypt from 'bcrypt';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as uuid from 'uuid';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private httpService: HttpService,
  ) {}

  async login(user: User) {
    const payload = { userId: user.id };
    const isFirstLogin = user.registerProgress - 1;
    if (user.registerProgress === 1) {
      user.registerProgress = 2;
      await this.userRepository.save(user);
    }
    return {
      accessToken: this.jwtService.sign(payload),
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      friendCode: user.friendCode,
      isFirstLogin,
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email: email } });
    const isPasswordMatched = await bcrypt.compare(
      password,
      user?.hashedPassword ?? '',
    );
    if (!isPasswordMatched || user.registerProgress === 0) {
      return null;
    }

    return user;
  }

  async kakao(code: string) {
    const kakao_api_url = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_url=${process.env.KAKAO_REDIRECT_URL}&code=${code}`;

    const token_res = await firstValueFrom(
      this.httpService.post(kakao_api_url),
    );

    const accessToken: string = token_res.data.access_token;
    const userInfo = await firstValueFrom(
      this.httpService.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    );
    const email =
      userInfo.data.kakao_account.email ?? userInfo.data.id + '@kakao.com';
    console.log(email);
    const data = await this.userRepository.findOne({ where: { email: email } });
    console.log(data);
    if (!data) {
      const user = new User();

      const signupVerifyToken = uuid.v4();
      user.email = email;
      user.nickname = data.nickname;
      user.hashedPassword = 'kakao';
      user.socialId = 'kakao' ?? null;
      user.profileImgUrl = null;
      user.signupVerifyToken = signupVerifyToken;
      user.registerProgress = 1;
      user.friendCode = await this.userService.makeFriendCode();
      await this.userRepository.save(user);
    }
  }
}
