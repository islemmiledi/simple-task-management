import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksStorage } from './storage/tasks.storage';
import { TaskPriority, TaskStatus } from './enums/task.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Date;
  createdAt: Date;
}

@Injectable()
export class AppService {
  private tasks: Task[] = [];
  private currentId = 1;
  private storage: TasksStorage;

  constructor() {
    this.storage = new TasksStorage();
    const data = this.storage.loadTasks();
    this.tasks = data.tasks;
    this.currentId = data.currentId;
  }

  private saveToStorage(): void {
    this.storage.saveTasks(this.tasks, this.currentId);
  }

  getAllTasks(sortBy?: 'dueDate' | 'priority'): Task[] {
    if (sortBy) {
      return [...this.tasks].sort((a, b) => {
        if (sortBy === 'dueDate') {
          const dateA = new Date(a.dueDate).getTime();
          const dateB = new Date(b.dueDate).getTime();
          return dateA - dateB;
        }
        if (sortBy === 'priority') {
          const priorityOrder = { HIGH: 3, MEDIUM: 2, LOW: 1 };
          if (a.priority === b.priority) {
            const dateA = new Date(a.dueDate).getTime();
            const dateB = new Date(b.dueDate).getTime();
            return dateA - dateB;
          }
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        return 0;
      });
    }
    return this.tasks;
  }

  getTaskById(id: number): Task {
    const task = this.tasks.find(task => task.id === id);
    if (!task) {
      throw new NotFoundException(`Tâche avec l'ID ${id} non trouvée`);
    }
    return task;
  }

  updateTask(id: number, updateData: UpdateTaskDto): Task {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      throw new NotFoundException(`Tâche avec l'ID ${id} non trouvée`);
    }

    const updatedData = {
      ...updateData,
      dueDate: updateData.dueDate ? new Date(updateData.dueDate) : this.tasks[taskIndex].dueDate
    };

    this.tasks[taskIndex] = {
      ...this.tasks[taskIndex],
      ...updatedData,
    };

    this.saveToStorage();
    return this.tasks[taskIndex];
  }

  deleteTask(id: number): void {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      throw new NotFoundException(`Tâche avec l'ID ${id} non trouvée`);
    }
    this.tasks.splice(taskIndex, 1);
    this.saveToStorage();
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const newTask: Task = {
      id: this.currentId++,
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: createTaskDto.status,
      priority: createTaskDto.priority,
      dueDate: new Date(createTaskDto.dueDate),
      createdAt: new Date(),
    };
    
    this.tasks.push(newTask);
    this.saveToStorage();
    return newTask;
  }
}
