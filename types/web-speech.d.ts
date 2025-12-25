// types/web-speech.d.ts
declare global {
  interface Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
    speechSynthesis: any;
  }
  interface SpeechRecognitionEvent extends Event {
    results: any;
  }
}
export {};
