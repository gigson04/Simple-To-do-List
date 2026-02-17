import { LogOut, User } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '../hooks/useAuth';

export function TodoHeader() {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between py-6 mb-8 border-b">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight text-primary">ZenTask</h1>
        <p className="text-muted-foreground">Stay focused, one task at a time.</p>
      </div>
      
      {user && (
        <div className="flex items-center gap-4 animate-fade-in">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-primary">
              <User size={16} />
            </div>
            <span className="hidden sm:inline">{user.displayName || user.email}</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={logout}
            className="flex items-center gap-2 text-muted-foreground hover:text-destructive"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      )}
    </header>
  );
}
