import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';
import * as fs from 'fs';
import { EnvConfig } from "./interfaces/config.env.interface";
import { FacebookConfig } from "./interfaces/config.facebook.interface";
import { OrmConfig } from "./interfaces/config.orm.interface";

export class ConfigService {
    private readonly envConfig: EnvConfig;

    constructor(filePath: string) {
        const config = dotenv.parse(fs.readFileSync(filePath));
        this.envConfig = this.validateInput(config);
    }

    private getValue(key: string, throwOnMissing = true): string {
        const value = this.envConfig[key];
        if (!value && throwOnMissing) {
            throw new Error(`config error - missing env.${key}`);
        }

        return value;
    }

    private validateInput(envConfig: EnvConfig): EnvConfig {
        const envVarsSchema: Joi.ObjectSchema = Joi.object({
            NODE_ENV: Joi.string()
                .valid('development', 'production', 'test', 'provision')
                .default('development'),
            APP_PORT: Joi.number().default(3000),
            API_HOST: Joi.string().default('localhost:3001'),
            MODE: Joi.string().default('DEV'),
            POSTGRES_HOST: Joi.string().default('localhost'),
            POSTGRES_PORT: Joi.number().default(5432),
            POSTGRES_USER: Joi.string().default('root'),
            POSTGRES_PASSWORD: Joi.string().default(''),
            POSTGRES_DATABASE: Joi.string().default('db'),
            FACEBOOK_APP_CLIENT_ID: Joi.string(),
            FACEBOOK_APP_CLIENT_SECRET: Joi.string()
        });
        const { error, value: validatedEnvConfig } = envVarsSchema.validate(
            envConfig,
        );
        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }
        return validatedEnvConfig;
    }

    get(key: string): string {
        return this.envConfig[key];
    }

    get appPort(): number {
        return Number(this.envConfig.APP_PORT)
    }

    get apiHost(): string {
        return String(this.envConfig.API_HOST)
    }

    public orm(): OrmConfig {
        return {
            host: this.getValue('POSTGRES_HOST'),
            port: parseInt(this.getValue('POSTGRES_PORT')),
            username: this.getValue('POSTGRES_USER'),
            password: this.getValue('POSTGRES_PASSWORD'),
            database: this.getValue('POSTGRES_DATABASE'),
        }
    }

    public facebook(): FacebookConfig {
        return {
            clientID: this.getValue('FACEBOOK_APP_CLIENT_ID'),
            clientSecret: this.getValue('FACEBOOK_APP_CLIENT_SECRET'),
            fbGraphVersion: 'v3.0'
        }
    }
}

const processEnv = (!process.env.NODE_ENV || process.env.NODE_ENV === 'none') ? 'development' : process.env.NODE_ENV;
const configService = new ConfigService(`${processEnv}.env`);

export { configService }
