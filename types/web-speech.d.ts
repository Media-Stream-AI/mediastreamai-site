// types/web-speech.d.ts
// Minimal Web Speech API shims to satisfy TypeScript in CI.
// We keep them as 'any' to avoid conflicts with other libs.

declare global {
  interface Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
    speechSynthesis: any;
  }
  // Loose event shape to keep CI happy
  interface SpeechRecognitionEvent extends Event {
    results: any;
  }
}

export {};
