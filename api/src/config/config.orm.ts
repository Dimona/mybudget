import {ConnectionOptions} from 'typeorm';
import { configService } from "./config.service";
import { join } from 'path';
import { User } from "../model/user.entity";
// You can load you .env file here synchronously using dotenv package (not installed here),
// import * as dotenv from 'dotenv';
// import * as fs from 'fs';
// const environment = process.env.NODE_ENV || 'development';
// const data: any = dotenv.parse(fs.readFileSync(`${environment}.env`));
// You can also make a singleton service that load and expose the .env file content.
// ...

const ormConfig = configService.orm();
// console.log(ormConfig);

// Check typeORM documentation for more information.
const config: ConnectionOptions = {
    type: 'postgres',
    host: ormConfig.host,
    port: ormConfig.port,
    username: ormConfig.username,
    password: ormConfig.password,
    database: ormConfig.database,
    entities: [
        User
    ],

    // We are using migrations, synchronize should be set to false.
    synchronize: false,

    // Run migrations automatically,
    // you can disable this if you prefer running migration manually.
    migrationsRun: false,
    logging: false,
    logger: 'file',

    // Allow both start:prod and start:dev to use migrations
    // __dirname is either dist or src folder, meaning either
    // the compiled js in prod or the ts in dev.
    migrations: [
        join(__dirname, './db/migrations/*{.ts,.js}')
    ],
    // subscribers: [
    //     "src/subscriber/**/*.ts"
    // ],
    cli: {
        // Location of migration should be inside src folder
        // to be compiled into dist/ folder.
        migrationsDir: join(__dirname, './db/migrations'),
    },

    //ssl: false
    // ssl: configService.isProduction()

    //         entities: ['**/*.entity{.ts,.js}'],
    //
    //         migrationsTableName: 'migrations',
    //
    //         migrations: ['src/db/migrations/*.ts'],
    //
    //         cli: {
    //             migrationsDir: 'src/db/migrations',
    //         },
    //
    //         ssl: this.isProduction(),
    //     };
};

export = config;
