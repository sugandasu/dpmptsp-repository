import { nullTransformer } from "../utils/nullTransformer";
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
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", unique: true })
  username!: string;

  @Column({
    type: "varchar",
    unique: true,
    nullable: true,
    transformer: nullTransformer,
  })
  email?: string | null;

  @Column()
  password!: string;

  @Column({ type: "enum", enum: UserRoles, default: UserRoles.PEGAWAI })
  role!: UserRoles;

  @Column({
    type: "varchar",
    unique: true,
    nullable: true,
    transformer: nullTransformer,
  })
  token?: string | null;

  @Column({ type: "int", default: 0 })
  tokenVersion: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default User;
