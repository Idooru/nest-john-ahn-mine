import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './interface/boards.model';
import { v1 as uuid } from 'uuid';
import { Json } from './interface/boards.res';
import { CreateBoardDtoParam } from './dto/create_board.dto';
import { RemoveBoardDtoParam } from './dto/remove-boards.dto';
import { GetOneDtoParam } from './dto/getOne_board.dto';
import {
  ModifyBoardDtoBody,
  ModifyBoardDtoParam,
} from './dto/modify_board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAll(): Json {
    if (!this.boards.length) {
      throw new NotFoundException('Fail to get boards, The board are empty');
    }

    return {
      statusCode: 200,
      message: 'Sucess to get boards',
      result: this.boards,
    };
  }

  getOne(getOneDtoParam: GetOneDtoParam): Json {
    const { id } = getOneDtoParam;
    const board: Board = this.boards.find((board) => board.id === id);

    if (!board) {
      throw new NotFoundException(
        `Fail to get board by ${id}, The id is not exist`,
      );
    }

    return {
      statusCode: 200,
      message: `Sucess to get board by ${id}`,
      result: board,
    };
  }

  create(createBoardDtoParam: CreateBoardDtoParam): Json {
    const { title, description } = createBoardDtoParam;
    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);

    return {
      statusCode: 201,
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
      throw new NotFoundException(
        `Fail to modify board by ${id}, The is is not exist`,
      );
    }

    const index = this.boards.indexOf(filtering);
    this.boards[index].title = title;
    this.boards[index].description = description;
    this.boards[index].status = status;

    return {
      statusCode: 201,
      message: `Sucess to modify Board by ${id}`,
    };
  }

  remove(removeBoardDtoParam: RemoveBoardDtoParam): Json {
    const { id } = removeBoardDtoParam;
    this.boards = this.boards.filter((board) => board.id !== id);

    return {
      statusCode: 200,
      message: `Sucess to remove Board by ${id}`,
    };
  }
}
