import { useAuth } from './hooks/useAuth';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { LandingPage } from './components/LandingPage';
import { Spinner } from './components/ui/spinner';

function App() {
  const { user, loading, login } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <Spinner className="h-10 w-10 text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20 selection:text-primary transition-colors duration-500">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {!user ? (
          <LandingPage onLogin={login} />
        ) : (
          <div className="py-8 animate-fade-in">
            <TodoHeader />
            <TodoList userId={user.id} />
            
            <footer className="mt-20 py-8 text-center text-sm text-muted-foreground border-t">
              <p>&copy; {new Date().getFullYear()} Gigs Task. All rights reserved.</p>
              <p className="mt-1 italic">Stay focused, stay zen.</p>
            </footer>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
