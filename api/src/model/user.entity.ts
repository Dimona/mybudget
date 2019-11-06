import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn } from 'typeorm';
// import { BaseEntity } from './base.entity';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 300, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    email: string;

    @Column({ type: 'varchar', length: 1000 })
    avatar: string;

    @Column({ type: 'varchar' })
    facebookId: string;

    @Column({ type: 'varchar' })
    token: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', nullable: false })
    createdAt: Date;
}
