import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import VoiceButton from './VoiceButton';
import VoiceVisualizer from './VoiceVisualizer';
import { useVoiceRecognition } from '@/hooks/useVoiceRecognition';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { useVoiceCommands } from '@/hooks/useVoiceCommands';
import { Badge } from '@/components/ui/badge';
import { Mic, Volume2, Smartphone, Camera, Phone } from 'lucide-react';

export default function VoiceAssistant() {
  const {
    isListening,
    transcript,
    confidence,
    startListening,
    stopListening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useVoiceRecognition();

  const { isSpeaking, speak } = useTextToSpeech();
  const { processCommand, voiceCommands } = useVoiceCommands();
  const [lastCommand, setLastCommand] = useState('');

  useEffect(() => {
    if (transcript && !isListening && transcript !== lastCommand) {
      setLastCommand(transcript);
      processCommand(transcript);
      // Clear transcript after processing
      setTimeout(() => {
        resetTranscript();
      }, 3000);
    }
  }, [transcript, isListening, processCommand, lastCommand, resetTranscript]);

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const getStatusText = () => {
    if (isSpeaking) return "बोल रहा हूँ...";
    if (isListening) return "सुन रहा हूँ...";
    return "तैयार हूँ";
  };

  const getStatusColor = () => {
    if (isSpeaking) return "voice-speaking";
    if (isListening) return "voice-listening";
    return "voice-idle";
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <Card className="p-8 text-center bg-card/50 backdrop-blur border-border">
        <Mic className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-xl font-semibold mb-2">वॉइस असिस्टेंट</h3>
        <p className="text-muted-foreground">
          आपका ब्राउज़र वॉइस रिकॉर्डिंग को सपोर्ट नहीं करता।
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Voice Interface */}
      <Card className="p-8 text-center bg-card/50 backdrop-blur border-border">
        <div className="space-y-6">
          {/* Status */}
          <div className="space-y-2">
            <Badge 
              variant="secondary" 
              className={`text-${getStatusColor()} border-${getStatusColor()}/20 bg-${getStatusColor()}/10`}
            >
              {getStatusText()}
            </Badge>
            {confidence > 0 && (
              <Badge variant="outline" className="ml-2">
                विश्वसनीयता: {Math.round(confidence * 100)}%
              </Badge>
            )}
          </div>

          {/* Voice Visualizer */}
          <VoiceVisualizer 
            isListening={isListening} 
            isSpeaking={isSpeaking}
            className="mx-auto"
          />

          {/* Voice Button */}
          <VoiceButton 
            isListening={isListening}
            onToggle={handleVoiceToggle}
            className="mx-auto"
          />

          {/* Instructions */}
          <div className="text-sm text-muted-foreground max-w-md mx-auto">
            <p className="mb-2">
              {isListening 
                ? "अब बोलें... मैं सुन रहा हूँ" 
                : "माइक बटन दबाकर बोलना शुरू करें"
              }
            </p>
          </div>

          {/* Current Transcript */}
          {transcript && (
            <Card className="p-4 bg-secondary/50">
              <p className="text-sm font-medium">आपने कहा:</p>
              <p className="text-foreground">{transcript}</p>
            </Card>
          )}
        </div>
      </Card>

      {/* Voice Commands Help */}
      <Card className="p-6 bg-card/50 backdrop-blur border-border">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Volume2 className="h-5 w-5 mr-2 text-primary" />
          वॉइस कमांड्स
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {voiceCommands.slice(0, 8).map((cmd, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-secondary/30">
              {cmd.command === "स्क्रीनशॉट" && <Camera className="h-4 w-4 text-accent" />}
              {(cmd.command === "कॉल उठाओ" || cmd.command === "कॉल काटो") && <Phone className="h-4 w-4 text-accent" />}
              {["कैमरा", "गैलरी", "व्हाट्सऐप"].includes(cmd.command) && <Smartphone className="h-4 w-4 text-accent" />}
              {["हैलो", "समय"].includes(cmd.command) && <Mic className="h-4 w-4 text-accent" />}
              <span className="text-sm font-medium">"{cmd.command}"</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4 text-center">
          इनमें से कोई भी कमांड बोलें। मैं आपकी मदद करूंगा!
        </p>
      </Card>
    </div>
  );
}