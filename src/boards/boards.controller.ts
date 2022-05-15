import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Json } from './interface/boards.res';
import { CreateBoardDto } from './dto/create_board.dto';
import { ModifyBoardDto } from './dto/modify_board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private BoardsService: BoardsService) {}

  @Get('/')
  getAll(): Json {
    return this.BoardsService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') id: string): Json {
    return this.BoardsService.getOne(id);
  }

  @Post('/')
  create(@Body() createBoardDto: CreateBoardDto): Json {
    return this.BoardsService.create(createBoardDto);
  }

  @Patch('/:id')
  modify(
    @Body('title') title: string,
    @Body('description') description: string,
    @Param('id') id: string,
  ): Json {
    return this.BoardsService.modify(title, description, id);
  }

  @Delete('/:id')
  remove(@Param('id') id: string): Json {
    return this.BoardsService.remove(id);
  }
}
