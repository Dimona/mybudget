import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from "../model/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserService],
    exports: [UserService, TypeOrmModule],
})
export class UserModule {}
