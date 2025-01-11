import { IsString, IsOptional, IsBoolean, MinLength, IsEnum, IsDateString } from 'class-validator';
import { TaskPriority, TaskStatus } from '../enums/task.enum';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: TaskPriority;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @IsDateString()
  @IsOptional()
  dueDate?: string;
} 