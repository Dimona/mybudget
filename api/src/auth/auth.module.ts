import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { FacebookStrategy } from "./facebook.strategy";

@Module({
    imports: [UserModule],
    providers: [FacebookStrategy],
    controllers: [AuthController],
})
export class AuthModule {}
