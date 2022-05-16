import { PipeTransform, BadRequestException } from '@nestjs/common';
import { BoardStatus, InputBoardStatus } from '../interface/boards.model';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

  transform(input: InputBoardStatus) {
    const upper = input.status.toUpperCase();

    if (!this.isStatusValid(upper)) {
      throw new BadRequestException(`Validation Fail, ${upper} is not exist`);
    }

    return input;
  }

  private isStatusValid(upper: any) {
    const idx = this.StatusOptions.indexOf(upper);
    return idx !== -1;
  }
}
