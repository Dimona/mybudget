// import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { ConfigService, configService } from './config.service';
// SET NODE_ENV=production
// const processEnv = (!process.env.NODE_ENV || process.env.NODE_ENV === 'none') ? 'development' : process.env.NODE_ENV;

@Module({
    providers: [
        {
            provide: ConfigService,
            useValue: configService,
        },
    ],
    exports: [ConfigService],
})
export class ConfigModule {}
    
