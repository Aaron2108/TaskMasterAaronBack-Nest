import { Delete } from '@nestjs/common';
import { User } from '../../users/entities/user.entity';
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task{

    //@PrimaryGeneratedColumn()
    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    title: string;

    @Column({type: "text"})
    description: string;

    @Column({ type: 'timestamp' })
    fecha_vencimiento: Date;

    @Column({ type: 'tinyint', default: 0 })
    estado: boolean;


    @DeleteDateColumn()
    DeletedAt: Date;

    //**Si en caso quiero traer todo**/
    // @ManyToOne(()=> User, (user)=> user.tasks, {
    //     eager: true
    // })
    // user: User;

    //**Solo quiero traerme el email del usuario ya que es unico */
    @ManyToOne(()=> User)
    @JoinColumn({name: 'userEmail', referencedColumnName: 'email'})
    user:User;

    @Column()
    userEmail: string;
}