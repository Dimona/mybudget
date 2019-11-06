import PassportHttpBearer = require('passport-http-bearer');
import { use } from 'passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../model/user.entity";

@Injectable()
export class BearerStrategy {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {
        this.init();
    }

    init() {
        use('http-bearer', new PassportHttpBearer.Strategy(
            async (token: string, done: any) => {
                if (!token) {
                    throw new UnauthorizedException();
                }
                const user = await this.userRepository.findOne({ token });
                return done(null, user);
            }
        ))
    }
}
