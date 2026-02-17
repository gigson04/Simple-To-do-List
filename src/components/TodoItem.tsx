import { Trash2, Check, Circle } from 'lucide-react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { blink } from '../lib/blink';
import type { Todo } from '../types/todo';
import { toast } from 'react-hot-toast';
import { cn } from '../lib/utils';

interface TodoItemProps {
  todo: Todo;
  onUpdate: () => void;
}

export function TodoItem({ todo, onUpdate }: TodoItemProps) {
  const isCompleted = Number(todo.completed) > 0;

  const toggleComplete = async () => {
    try {
      await blink.db.todos.update(todo.id, {
        completed: isCompleted ? 0 : 1
      });
      onUpdate();
    } catch (error) {
      console.error('Failed to update todo:', error);
      toast.error('Failed to update task.');
    }
  };

  const deleteTodo = async () => {
    try {
      await blink.db.todos.delete(todo.id);
      onUpdate();
      toast.success('Task deleted.');
    } catch (error) {
      console.error('Failed to delete todo:', error);
      toast.error('Failed to delete task.');
    }
  };

  return (
    <div 
      className={cn(
        "group flex items-center justify-between p-4 rounded-xl border transition-all duration-300 mb-3",
        isCompleted ? "bg-secondary/50 border-transparent" : "bg-card hover:border-primary/50 shadow-sm"
      )}
    >
      <div className="flex items-center gap-4 flex-1">
        <Checkbox 
          checked={isCompleted} 
          onCheckedChange={toggleComplete}
          className="h-6 w-6 rounded-full border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary"
        />
        <span 
          className={cn(
            "text-lg transition-all duration-300",
            isCompleted ? "text-muted-foreground line-through decoration-primary/30" : "text-foreground"
          )}
        >
          {todo.task}
        </span>
      </div>
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={deleteTodo}
        className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
      >
        <Trash2 size={18} />
      </Button>
    </div>
  );
}
