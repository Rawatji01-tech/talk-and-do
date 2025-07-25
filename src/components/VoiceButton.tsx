import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface VoiceButtonProps {
  isListening: boolean;
  onToggle: () => void;
  className?: string;
}

export default function VoiceButton({ isListening, onToggle, className }: VoiceButtonProps) {
  return (
    <Button
      onClick={onToggle}
      variant="ghost"
      size="lg"
      className={cn(
        "relative h-20 w-20 rounded-full transition-all duration-300",
        isListening 
          ? "bg-gradient-voice shadow-lg shadow-primary/50 animate-pulse-glow" 
          : "bg-secondary hover:bg-secondary/80",
        className
      )}
    >
      <div className={cn(
        "relative z-10 transition-all duration-300",
        isListening ? "text-white scale-110" : "text-foreground"
      )}>
        {isListening ? (
          <MicOff className="h-8 w-8" />
        ) : (
          <Mic className="h-8 w-8" />
        )}
      </div>
      
      {isListening && (
        <div className="absolute inset-0 rounded-full bg-gradient-glow animate-pulse" />
      )}
    </Button>
  );
}