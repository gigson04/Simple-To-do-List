import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { blink } from '../lib/blink';
import { toast } from 'react-hot-toast';

interface TodoInputProps {
  userId: string;
  onAdd: () => void;
}

export function TodoInput({ userId, onAdd }: TodoInputProps) {
  const [task, setTask] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.trim()) return;

    setIsAdding(true);
    try {
      await blink.db.todos.create({
        userId,
        task: task.trim(),
        completed: 0,
      });
      setTask('');
      onAdd();
      toast.success('Task added!');
    } catch (error) {
      console.error('Failed to add task:', error);
      toast.error('Failed to add task.');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <form onSubmit={handleAdd} className="flex items-center gap-2 mb-8">
      <Input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="What needs to be done?"
        className="h-12 text-lg shadow-elegant focus-visible:ring-primary"
        disabled={isAdding}
      />
      <Button 
        type="submit" 
        size="lg" 
        className="h-12 px-6 shadow-elegant"
        disabled={isAdding}
      >
        <Plus className="mr-2 h-5 w-5" />
        Add
      </Button>
    </form>
  );
}
