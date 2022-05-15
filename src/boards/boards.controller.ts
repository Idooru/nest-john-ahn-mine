import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Json } from './interface/boards.res';
import { CreateBoardDto } from './dto/create_board.dto';
import { ModifyBoardDto } from './dto/modify_board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private BoardsService: BoardsService) {}

  @Get('/getAll')
  getAll(): Json {
    return this.BoardsService.getAll();
  }

  @Get('/getOne/:id')
  getOne(@Param('id') id: string): Json {
    return this.BoardsService.getOne(id);
  }

  @Post('/create')
  create(@Body() createBoardDto: CreateBoardDto): Json {
    return this.BoardsService.create(createBoardDto);
  }

  @Patch('/modify/:id')
  modify(
    @Body('title') title: string,
    @Body('description') description: string,
    @Param('id') id: string,
  ): Json {
    return this.BoardsService.modify(title, description, id);
  }
}
