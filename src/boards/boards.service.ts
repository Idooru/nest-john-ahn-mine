import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './interface/boards.model';
import { v1 as uuid } from 'uuid';
import { Json } from './interface/boards.res';
import { CreateBoardDto } from './dto/create_board.dto';
import {
  ModifyBoardDtoBody,
  ModifyBoardDtoParam,
} from './dto/modify_board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAll(): Json {
    return {
      code: 200,
      message: 'Sucess to get Boards',
      result: this.boards,
    };
  }

  getOne(id: string): Json {
    const board: Board = this.boards.find((board) => board.id === id);

    return {
      code: 200,
      message: `Sucess to get Board By ${id}`,
      result: board,
    };
  }

  create(createBoardDto: CreateBoardDto): Json {
    const { title, description } = createBoardDto;
    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);

    return {
      code: 201,
      message: 'Sucess to create Board',
      result: board,
    };
  }

  modify(
    modifyBoardDtoBody: ModifyBoardDtoBody,
    modifyBoardDtoParam: ModifyBoardDtoParam,
  ): Json {
    const { title, description, status } = modifyBoardDtoBody;
    const { id } = modifyBoardDtoParam;
    const filtering = this.boards.find((board) => board.id === id);

    if (!filtering) {
      return {
        code: 401,
        message: 'Failed to modify Board, The id is not correct',
      };
    }

    const index = this.boards.indexOf(filtering);
    this.boards[index].title = title;
    this.boards[index].description = description;
    this.boards[index].status = status;

    return {
      code: 201,
      message: `Sucess to modify Board by ${id}`,
    };
  }

  remove(id: string): Json {
    this.boards = this.boards.filter((board) => board.id !== id);

    return {
      code: 200,
      message: `Sucess to remove Board by ${id}`,
    };
  }
}
