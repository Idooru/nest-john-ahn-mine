import { BoardStatus } from '../interface/boards.model';

export class ModifyBoardDtoBody {
  title: string;
  description: string;
  status: BoardStatus;
}

export class ModifyBoardDtoParam {
  id: string;
}
