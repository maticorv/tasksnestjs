import {ValidateIf, IsNotEmpty, IsOptional} from "class-validator";

export class UpdateTaskDTO {
    @IsOptional()
    @IsNotEmpty()
    title: string;
    
    @IsOptional()
    @IsNotEmpty()
    description: string

}