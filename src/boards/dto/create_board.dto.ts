import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBoardDtoParam {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
