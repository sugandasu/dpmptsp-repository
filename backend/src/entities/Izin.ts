import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export enum IzinTypes {
  PERORANGAN = "Perorangan",
  PERUSAHAAN = "Perusahaan",
}

@Entity()
class Izin extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", unique: true })
  number!: string;

  @Column({ type: "enum", enum: IzinTypes, default: IzinTypes.PERORANGAN })
  type!: IzinTypes;

  @Column()
  name!: string;

  @Column({ type: "date" })
  effectiveDate!: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Izin;
