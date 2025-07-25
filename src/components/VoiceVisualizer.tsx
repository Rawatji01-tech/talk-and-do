import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface VoiceVisualizerProps {
  isListening: boolean;
  isSpeaking: boolean;
  className?: string;
}

export default function VoiceVisualizer({ isListening, isSpeaking, className }: VoiceVisualizerProps) {
  const [bars, setBars] = useState(Array(5).fill(0));

  useEffect(() => {
    if (isListening || isSpeaking) {
      const interval = setInterval(() => {
        setBars(bars => bars.map(() => Math.random() * 100 + 10));
      }, 150);
      return () => clearInterval(interval);
    } else {
      setBars(Array(5).fill(20));
    }
  }, [isListening, isSpeaking]);

  return (
    <div className={cn("flex items-end justify-center space-x-1 h-16", className)}>
      {bars.map((height, index) => (
        <div
          key={index}
          className={cn(
            "w-2 rounded-full transition-all duration-150 ease-out",
            isListening ? "bg-voice-listening" : isSpeaking ? "bg-voice-speaking" : "bg-voice-idle",
            (isListening || isSpeaking) && "animate-voice-wave"
          )}
          style={{
            height: `${height}%`,
            animationDelay: `${index * 100}ms`
          }}
        />
      ))}
    </div>
  );
}