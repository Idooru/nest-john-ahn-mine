import { BadRequestException, PipeTransform } from '@nestjs/common';
import { InputBoardStatus } from '../interface/boards.model';
import { BoardStatus } from '../interface/boards.model';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PUBLIC, BoardStatus.PRIVATE];

  transform(value: InputBoardStatus) {
    const upper = value.status.toUpperCase();

    if (!this.isStatusValid(upper)) {
      throw new BadRequestException(`Validation Fail, ${value} is not exist`);
    }

    return value;
  }

  private isStatusValid(upper: any) {
    const idx = this.StatusOptions.indexOf(upper);
    return idx !== -1;
  }
}
