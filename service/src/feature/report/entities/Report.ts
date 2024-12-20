import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {IsNotEmpty, Length} from "class-validator";

@Entity("reports")
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    @IsNotEmpty()
    @Length(3, 50)
    name: string;

    @Column("int")
    age: number;

    @Column("varchar",{ nullable: true })
    file: string | null;

    @CreateDateColumn({ type: "timestamp with time zone" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp with time zone" })
    updatedAt: Date;
}
