import * as fs from 'fs';
import * as path from 'path';
import { Task } from '../app.service';

export class TasksStorage {
  private readonly filePath: string;

  constructor() {
    this.filePath = path.join(__dirname, '../../data/tasks.json');
    this.ensureDirectoryExists();
  }

  private ensureDirectoryExists(): void {
    const dir = path.dirname(this.filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify({ tasks: [], currentId: 1 }));
    }
  }

  loadTasks(): { tasks: Task[]; currentId: number } {
    const content = fs.readFileSync(this.filePath, 'utf-8');
    const data = JSON.parse(content);
    return {
      tasks: data.tasks.map(task => ({
        ...task,
        createdAt: new Date(task.createdAt)
      })),
      currentId: data.currentId
    };
  }

  saveTasks(tasks: Task[], currentId: number): void {
    fs.writeFileSync(
      this.filePath,
      JSON.stringify({ tasks, currentId }, null, 2)
    );
  }
} 