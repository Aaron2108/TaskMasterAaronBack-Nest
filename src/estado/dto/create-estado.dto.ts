import { PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Estado } from "../entities/estado.entity";

export class CreateEstadoDto{
      @IsString()
      @IsNotEmpty()
      descripcion: string;
    }
    
