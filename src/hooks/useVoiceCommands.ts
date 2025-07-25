import { useCallback } from 'react';
import { useTextToSpeech } from './useTextToSpeech';
import { toast } from '@/hooks/use-toast';

export interface VoiceCommand {
  command: string;
  action: () => void | Promise<void>;
  response: string;
}

export function useVoiceCommands() {
  const { speak } = useTextToSpeech();

  const takeScreenshot = useCallback(async () => {
    try {
      // For web version, we'll capture the viewport
      if (typeof window !== 'undefined') {
        // Using html2canvas for web screenshot (would need to be added as dependency)
        toast({
          title: "स्क्रीनशॉट",
          description: "वेब वर्जन में स्क्रीनशॉट फीचर जल्द आएगा।"
        });
        return "स्क्रीनशॉट लेने की कोशिश की गई।";
      }
    } catch (error) {
      console.error('Screenshot error:', error);
      return "स्क्रीनशॉट लेने में समस्या हुई।";
    }
  }, []);

  const openApp = useCallback(async (appName: string) => {
    try {
      // Native app opening functionality will be implemented with Capacitor plugins
      toast({
        title: "ऐप खोलना",
        description: `${appName} खोलने की कोशिश की जा रही है।`
      });
      return `${appName} खोलने की कोशिश की गई।`;
    } catch (error) {
      console.error('App opening error:', error);
      return `${appName} खोलने में समस्या हुई।`;
    }
  }, []);

  const answerCall = useCallback(async () => {
    try {
      // Call answering functionality for native mobile
      toast({
        title: "कॉल उत्तर",
        description: "कॉल का उत्तर देने की कोशिश की जा रही है।"
      });
      return "कॉल का उत्तर देने की कोशिश की गई।";
    } catch (error) {
      console.error('Call answer error:', error);
      return "कॉल का उत्तर देने में समस्या हुई।";
    }
  }, []);

  const rejectCall = useCallback(async () => {
    try {
      // Call rejection functionality for native mobile
      toast({
        title: "कॉल अस्वीकार",
        description: "कॉल को अस्वीकार करने की कोशिश की जा रही है।"
      });
      return "कॉल को अस्वीकार करने की कोशिश की गई।";
    } catch (error) {
      console.error('Call reject error:', error);
      return "कॉल अस्वीकार करने में समस्या हुई।";
    }
  }, []);

  const voiceCommands: VoiceCommand[] = [
    {
      command: "स्क्रीनशॉट",
      action: takeScreenshot,
      response: "स्क्रीनशॉट लिया जा रहा है।"
    },
    {
      command: "कैमरा",
      action: () => openApp("कैमरा"),
      response: "कैमरा खोला जा रहा है।"
    },
    {
      command: "गैलरी",
      action: () => openApp("गैलरी"),
      response: "गैलरी खोली जा रही है।"
    },
    {
      command: "व्हाट्सऐप",
      action: () => openApp("व्हाट्सऐप"),
      response: "व्हाट्सऐप खोला जा रहा है।"
    },
    {
      command: "कॉल उठाओ",
      action: answerCall,
      response: "कॉल का उत्तर दिया जा रहा है।"
    },
    {
      command: "कॉल काटो",
      action: rejectCall,
      response: "कॉल काटी जा रही है।"
    },
    {
      command: "हैलो",
      action: () => {},
      response: "नमस्ते! मैं आपका वॉइस असिस्टेंट हूँ। आप मुझसे कोई भी काम करवा सकते हैं।"
    },
    {
      command: "समय",
      action: () => {},
      response: `अभी समय है ${new Date().toLocaleTimeString('hi-IN')}`
    }
  ];

  const processCommand = useCallback(async (transcript: string) => {
    const normalizedTranscript = transcript.toLowerCase().trim();
    
    const matchedCommand = voiceCommands.find(cmd => 
      normalizedTranscript.includes(cmd.command.toLowerCase())
    );

    if (matchedCommand) {
      speak(matchedCommand.response);
      try {
        await matchedCommand.action();
      } catch (error) {
        console.error('Command execution error:', error);
        speak("काम करने में समस्या हुई।");
      }
    } else {
      speak("मुझे समझ नहीं आया। कृपया दोबारा कहें।");
    }
  }, [speak, voiceCommands]);

  return {
    processCommand,
    voiceCommands
  };
}