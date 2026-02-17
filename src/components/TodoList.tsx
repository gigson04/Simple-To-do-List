import { useState, useEffect } from 'react';
import { blink } from '../lib/blink';
import type { Todo } from '../types/todo';
import { TodoItem } from './TodoItem';
import { TodoInput } from './TodoInput';
import { Spinner } from './ui/spinner';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { LayoutList, CheckCircle2, Circle } from 'lucide-react';

interface TodoListProps {
  userId: string;
}

export function TodoList({ userId }: TodoListProps) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const fetchTodos = async () => {
    try {
      const data = await blink.db.todos.list({
        where: { userId },
        orderBy: { createdAt: 'desc' }
      }) as Todo[];
      setTodos(data);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [userId]);

  const filteredTodos = todos.filter(todo => {
    const isCompleted = Number(todo.completed) > 0;
    if (filter === 'active') return !isCompleted;
    if (filter === 'completed') return isCompleted;
    return true;
  });

  const activeCount = todos.filter(t => Number(t.completed) === 0).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner className="h-8 w-8 text-primary" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <TodoInput userId={userId} onAdd={fetchTodos} />
      
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          Tasks
          <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-sm">
            {activeCount} active
          </span>
        </h2>
        
        <Tabs value={filter} onValueChange={(v) => setFilter(v as any)}>
          <TabsList className="bg-secondary/50">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <LayoutList size={14} />
              All
            </TabsTrigger>
            <TabsTrigger value="active" className="flex items-center gap-2">
              <Circle size={14} />
              Active
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              <CheckCircle2 size={14} />
              Completed
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-1">
        {filteredTodos.length > 0 ? (
          filteredTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} onUpdate={fetchTodos} />
          ))
        ) : (
          <div className="text-center py-20 bg-secondary/20 rounded-2xl border-2 border-dashed border-muted">
            <p className="text-muted-foreground text-lg">
              {filter === 'all' ? "No tasks yet. Add one to get started!" : 
               filter === 'active' ? "No active tasks. You're all caught up!" : 
               "No completed tasks yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
