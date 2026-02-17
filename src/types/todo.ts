export interface Todo {
  id: string;
  userId: string;
  task: string;
  completed: string | number; // SQLite returns "0" or "1"
  createdAt: string;
}
