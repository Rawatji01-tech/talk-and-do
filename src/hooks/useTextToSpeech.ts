import { useState, useCallback } from 'react';

interface TextToSpeechHook {
  speak: (text: string, lang?: string) => void;
  stop: () => void;
  isSpeaking: boolean;
  voices: SpeechSynthesisVoice[];
}

export function useTextToSpeech(): TextToSpeechHook {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Load available voices
  const loadVoices = useCallback(() => {
    const availableVoices = speechSynthesis.getVoices();
    setVoices(availableVoices);
  }, []);

  // Load voices on component mount and when voices change
  if (typeof window !== 'undefined') {
    speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  }

  const speak = useCallback((text: string, lang: string = 'hi-IN') => {
    if (typeof window === 'undefined' || !text) return;

    // Stop any current speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Try to find a Hindi voice
    const hindiVoice = voices.find(voice => 
      voice.lang.startsWith('hi') || 
      voice.name.toLowerCase().includes('hindi')
    );

    if (hindiVoice) {
      utterance.voice = hindiVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    speechSynthesis.speak(utterance);
  }, [voices]);

  const stop = useCallback(() => {
    if (typeof window !== 'undefined') {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  return {
    speak,
    stop,
    isSpeaking,
    voices
  };
}