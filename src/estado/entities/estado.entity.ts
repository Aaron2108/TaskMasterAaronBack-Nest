import { Task } from "src/tasks/entities/task.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Estado {
    @Column({ primary: true, generated: true })
        id: number;
    
    @Column({type: "text"})
        descripcion: string;

    @OneToMany(()=> Task, (task)=> task.user)
        tasks: Task[];
}
