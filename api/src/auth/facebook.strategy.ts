import * as PassportFacebookToken from 'passport-facebook-token';
// import { PassportStrategy } from '@nestjs/passport';
import { use } from 'passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { AuthService } from './auth.service';
import { UserService } from "../user/user.service";
import { configService } from "../config/config.service";

@Injectable()
export class FacebookStrategy {
    constructor(private readonly userService: UserService) {
        this.init();
    }

    init() {
        // const facebookConfig = configService.facebook();
        use('facebook-token', new PassportFacebookToken(
            configService.facebook(),
            async (accessToken: string, refreshToken: string, profile: any, done: any) => {
                // console.log(accessToken, refreshToken, profile);
                if (!accessToken) {
                    throw new UnauthorizedException();
                }
                const user = await this.userService.findOrCreate(accessToken, profile);
                return done(null, user);
            }
        ))
    }
}
