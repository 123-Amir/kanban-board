export type ColumnId = 'todo' | 'inProgress' | 'done';

export interface Task {
  id: string;
  title: string;
  description?: string;
  columnId: ColumnId;
  createdAt: string;
  dueDate?: string;
}

export interface Project {
  id: string;
  name: string;
  tasks: Task[];
}

