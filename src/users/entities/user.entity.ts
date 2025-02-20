import { Role } from "../../common/enums/rol..enum";
import { Task } from "../../tasks/entities/task.entity";
import { Column, DeleteDateColumn, Entity, OneToMany,PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({unique: true, nullable: false})
    email: string;
    
    @Column({nullable: false, select: false})
    password: string;

    @Column({type:'enum', default: Role.USER, enum:Role})
    role:string;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(()=> Task, (task)=> task.user)
    tasks: Task[];
}