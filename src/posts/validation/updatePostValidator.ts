import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
// npm i --save class-validator class-transformer

export class UpdatePostValidator {
  @IsNumber()
  id: number;
  
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}