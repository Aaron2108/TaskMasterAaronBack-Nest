import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsOptional, IsString, MinLength } from "class-validator";
import { CreateTaskDto } from "./create-task.dto";

export class UpdateTaskDto extends PartialType(CreateTaskDto){
        //**Si en caso dependeiera de versiones */
        // @IsString()
        // @MinLength(10)
        // @IsOptional()
        // title?: string;
    
        // @IsString()
        // @IsOptional()
        // description?: string;
    
        // @Type(() => Date)
        // @IsDate()
        // @IsOptional()
        // fecha_vencimiento?: Date;
    
        // @IsString()
        // @IsOptional()
        // user?:string;
    
        // @IsBoolean()
        // @IsOptional()
        // estado?:boolean;
}