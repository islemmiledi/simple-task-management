import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { AppService, Task } from './app.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getTasks(@Query('sortBy') sortBy?: 'dueDate' | 'priority'): Task[] {
    return this.appService.getAllTasks(sortBy);
  }

  @Get(':id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Task {
    return this.appService.getTaskById(id);
  }

  @Put(':id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateTaskDto: UpdateTaskDto,
  ): Task {
    return this.appService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  deleteTask(@Param('id', ParseIntPipe) id: number): void {
    this.appService.deleteTask(id);
  }

  @Post()
  createTask(@Body(ValidationPipe) createTaskDto: CreateTaskDto): Task {
    return this.appService.createTask(createTaskDto);
  }
}
