import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import * as OrmConfig from './config/config.orm';
import { Connection } from 'typeorm';

// import { ConfigService } from './config/config.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AuthController } from "./auth/auth.controller";

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forRoot(OrmConfig),
        AuthModule,
        UserModule
    ],
    controllers: [AppController, AuthController],
    providers: [AppService],
})
export class AppModule {
    constructor(private readonly connection: Connection) {}
}
