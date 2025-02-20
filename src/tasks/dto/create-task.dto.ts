import { IsBoolean, IsDate, IsOptional, IsString, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateTaskDto{

    @IsString()
    @MinLength(10)
    title: string;

    @IsString()
    description: string;

    @Type(() => Date)
    @IsDate()
    fecha_vencimiento: Date;

    @IsString()
    @IsOptional()
    user?:string;

    @IsBoolean()
    @IsOptional()
    estado?:boolean;


}