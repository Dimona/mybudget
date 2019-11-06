import { Injectable } from '@nestjs/common';
import { User } from "../model/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { transliterate as tr } from 'transliteration';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async findOrCreate(accessToken: string, profile: any): Promise<User> {
        const { emails, id, displayName: name, photos } = profile;
        const [_email] = emails;
        const [_avatar] = photos;
        const { value: email } = _email || {};
        const { value:  avatar } = _avatar || {};

        let user = await this.userRepository.findOne({ facebookId: id });
        if (user) {
            return user;
        }
        user = await this.userRepository.create({ name: tr(name), email, avatar, facebookId: id, token: accessToken });
        await this.userRepository.save(user);

        return user;
    }
}
