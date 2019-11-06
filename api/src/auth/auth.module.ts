import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { FacebookStrategy } from './facebook.strategy';
import { BearerStrategy } from './bearer.strategy';

@Module({
    imports: [UserModule],
    providers: [FacebookStrategy, BearerStrategy],
    controllers: [AuthController],
})
export class AuthModule {}
