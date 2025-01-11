import { IsString, IsOptional, MinLength, IsEnum, IsDateString } from 'class-validator';
import { TaskPriority, TaskStatus } from '../enums/task.enum';

export class CreateTaskDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TaskPriority)
  priority: TaskPriority;

  @IsEnum(TaskStatus)
  status: TaskStatus = TaskStatus.TODO;

  @IsDateString()
  dueDate: string;
} 