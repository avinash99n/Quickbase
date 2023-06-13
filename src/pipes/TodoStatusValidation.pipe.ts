import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TodoStatus } from "src/model/todo.model";

export class TodoStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = [TodoStatus.OPEN, TodoStatus.WIP, TodoStatus.COMPLETED];

  transform(value: any, metadata: ArgumentMetadata): any {
    value = value.toString().toUpperCase();

    if (!this.isStatusValid(value)) {
        
      throw new BadRequestException(value + ` is an invalid status.`);
    }
    return value;
  }

  private isStatusValid(status : any) {
    const index = this.allowedStatus.indexOf(status);

    return index !== -1;
  }

}