import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Json } from './interface/boards.res';
import { GetOneDtoParam } from './dto/getOne_board.dto';
import { CreateBoardDtoParam } from './dto/create_board.dto';
import {
  ModifyBoardDtoBody,
  ModifyBoardDtoParam,
} from './dto/modify_board.dto';
import { RemoveBoardDtoParam } from './dto/remove-boards.dto';
import { BoardStatusValidationPipe } from './pipes/modify_validation.pipe';

@Controller('boards')
export class BoardsController {
  constructor(private BoardsService: BoardsService) {}

  @Get('/')
  getAll(): Json {
    return this.BoardsService.getAll();
  }

  @Get('/:id')
  @UsePipes(ValidationPipe)
  getOne(@Param() getOneDtoParam: GetOneDtoParam): Json {
    return this.BoardsService.getOne(getOneDtoParam);
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  create(@Body() createBoardDto: CreateBoardDtoParam): Json {
    return this.BoardsService.create(createBoardDto);
  }

  @Patch('/:id/fix')
  @UsePipes(ValidationPipe)
  modify(
    @Body(BoardStatusValidationPipe) modifyBoardDtoBody: ModifyBoardDtoBody,
    @Param() modifyBoardDtoParam: ModifyBoardDtoParam,
  ): Json {
    return this.BoardsService.modify(modifyBoardDtoBody, modifyBoardDtoParam);
  }

  @Delete('/:id')
  @UsePipes(ValidationPipe)
  remove(@Param() removeBoardDtoParam: RemoveBoardDtoParam): Json {
    return this.BoardsService.remove(removeBoardDtoParam);
  }
}
