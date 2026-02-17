import { LogIn, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';

interface LandingPageProps {
  onLogin: () => void;
}

export function LandingPage({ onLogin }: LandingPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-8 animate-bounce duration-3000">
        <CheckCircle2 className="text-primary h-12 w-12" />
      </div>
      
      <h1 className="text-5xl font-bold tracking-tight text-primary mb-4">
        ZenTask
      </h1>
      
      <p className="text-xl text-muted-foreground max-w-lg mb-10">
        The simple, beautiful, and minimalist way to manage your daily tasks.
        Boost your productivity without the clutter.
      </p>
      
      <Button 
        size="lg" 
        onClick={onLogin}
        className="h-14 px-10 text-lg rounded-full shadow-lg shadow-primary/20 hover:shadow-xl transition-all"
      >
        <LogIn className="mr-3 h-6 w-6" />
        Get Started for Free
      </Button>
      
      <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl text-left border-t pt-12">
        <div>
          <h3 className="font-semibold text-foreground mb-2">Minimalist Design</h3>
          <p className="text-sm text-muted-foreground">Focused UI that stays out of your way and keeps you on task.</p>
        </div>
        <div>
          <h3 className="font-semibold text-foreground mb-2">Cloud Sync</h3>
          <p className="text-sm text-muted-foreground">Your tasks are saved securely and synced across all your devices.</p>
        </div>
        <div>
          <h3 className="font-semibold text-foreground mb-2">Completely Free</h3>
          <p className="text-sm text-muted-foreground">Enjoy full features without any hidden costs or subscriptions.</p>
        </div>
      </div>
    </div>
  );
}
