import { IsNotEmpty, IsString } from 'class-validator';

export class GetOneDtoParam {
  @IsNotEmpty()
  @IsString()
  id: string;
}
