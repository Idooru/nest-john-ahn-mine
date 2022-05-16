import { BoardStatus } from '../interface/boards.model';
import { IsString, IsNotEmpty } from 'class-validator';

export class ModifyBoardDtoBody {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  status: BoardStatus;
}

export class ModifyBoardDtoParam {
  @IsNotEmpty()
  @IsString()
  id: string;
}
