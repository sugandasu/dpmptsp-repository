import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export enum UserRoles {
  PEGAWAI = "pegawai",
  API_CONSUMER = "api-consumer",
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", unique: true })
  username!: string;

  @Column({ type: "varchar", unique: true, nullable: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ type: "enum", enum: UserRoles })
  role!: UserRoles;

  @Column({ type: "varchar", unique: true })
  token!: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
