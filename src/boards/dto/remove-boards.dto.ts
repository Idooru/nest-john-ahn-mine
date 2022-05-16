import { IsNotEmpty, IsString } from 'class-validator';

export class RemoveBoardDtoParam {
  @IsNotEmpty()
  @IsString()
  id: string;
}
