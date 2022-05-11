import { IsString, IsNotEmpty } from 'class-validator';
// npm i --save class-validator class-transformer

export class CreatePostValidator {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}