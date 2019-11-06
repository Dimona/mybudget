import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsers1572048765763 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            create table users (
                id serial not null
                constraint users_pk
                primary key,
                name varchar not null,
                email varchar not null,
                avatar varchar,
                "facebookId" varchar not null,
                token varchar not null,
                "createdAt" timestamptz default now() not null
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            drop table users
        `);
    }
}
