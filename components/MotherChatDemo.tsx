'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Code, Send, Sparkles, ChevronDown } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  model?: string;
  isTyping?: boolean;
}

const DEMO_CONVERSATION: Message[] = [
  {
    role: 'user',
    content: 'Hello MOTHER, can you help me understand British AI sovereignty?'
  },
  {
    role: 'assistant',
    content: 'Of course! British AI sovereignty refers to the development and deployment of artificial intelligence systems that are designed, trained, and operated entirely within UK jurisdiction. This ensures data residency, regulatory compliance with UK law, and independence from foreign technology dependencies. Our MOTHER platform exemplifies this with UK-based training data, UK data centres, and full GDPR compliance.',
    model: 'MOTHER CORE 70B'
  },
  {
    role: 'user',
    content: 'Can you write me a Python function to connect to a UK-compliant API?'
  },
  {
    role: 'assistant',
    content: `Certainly! Here's a secure, UK-compliant API connection function:

\`\`\`python
import requests
from typing import Optional, Dict
import ssl

def connect_uk_api(
    endpoint: str,
    api_key: str,
    data: Optional[Dict] = None,
    timeout: int = 30
) -> Dict:
    """
    Secure connection to UK-sovereign API
    with TLS 1.3 and UK data residency.
    """
    headers = {
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json',
        'X-Data-Residency': 'UK',
        'X-Compliance': 'GDPR'
    }

    response = requests.post(
        endpoint,
        json=data,
        headers=headers,
        timeout=timeout,
        verify=True  # UK CA certificates
    )

    response.raise_for_status()
    return response.json()
\`\`\`

This follows British coding standards with proper type hints and documentation.`,
    model: 'MOTHER CODE'
  }
];

export default function MotherChatDemo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentModel, setCurrentModel] = useState('MOTHER CORE 70B');
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typingText, setTypingText] = useState('');
  const [showModelSwitch, setShowModelSwitch] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typingText]);

  // Typing animation effect
  useEffect(() => {
    if (!isPlaying || currentIndex >= DEMO_CONVERSATION.length) {
      if (currentIndex >= DEMO_CONVERSATION.length) {
        // Reset after delay
        setTimeout(() => {
          setMessages([]);
          setCurrentIndex(0);
          setCurrentModel('MOTHER CORE 70B');
        }, 5000);
      }
      return;
    }

    const currentMessage = DEMO_CONVERSATION[currentIndex];

    // Check if we need to show model switch animation
    if (currentMessage.model && currentMessage.model !== currentModel) {
      setShowModelSwitch(true);
      setTimeout(() => {
        setCurrentModel(currentMessage.model!);
        setShowModelSwitch(false);
      }, 1500);
    }

    if (currentMessage.role === 'user') {
      // User messages appear instantly
      setTimeout(() => {
        setMessages(prev => [...prev, currentMessage]);
        setCurrentIndex(prev => prev + 1);
      }, 1000);
    } else {
      // Assistant messages type out
      const fullText = currentMessage.content;
      let charIndex = 0;

      const typeInterval = setInterval(() => {
        if (charIndex < fullText.length) {
          setTypingText(fullText.substring(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(typeInterval);
          setTypingText('');
          setMessages(prev => [...prev, currentMessage]);
          setCurrentIndex(prev => prev + 1);
        }
      }, 15); // Typing speed

      return () => clearInterval(typeInterval);
    }
  }, [currentIndex, isPlaying, currentModel]);

  const models = [
    { id: 'core', name: 'MOTHER CORE 70B', icon: Brain, color: 'cyan' },
    { id: 'code', name: 'MOTHER CODE', icon: Code, color: 'green' },
  ];

  const activeModel = models.find(m => m.name === currentModel) || models[0];

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Chat Window */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-blue-500/30 overflow-hidden shadow-2xl shadow-blue-500/10"
      >
        {/* Header */}
        <div className="px-4 md:px-6 py-3 md:py-4 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${
                activeModel.color === 'cyan' ? 'from-cyan-500 to-blue-600' : 'from-green-500 to-emerald-600'
              } flex items-center justify-center`}>
                <activeModel.icon className="w-5 h-5 text-white" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900" />
            </div>
            <div>
              <div className="font-semibold text-white text-sm md:text-base">MOTHER AI</div>
              <div className="text-xs text-gray-400">British Sovereign AI</div>
            </div>
          </div>

          {/* Model Selector */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentModel}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 ${
                activeModel.color === 'cyan'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'bg-green-500/20 text-green-300 border border-green-500/30'
              }`}
            >
              <activeModel.icon className="w-3 h-3" />
              {currentModel}
              <ChevronDown className="w-3 h-3" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Model Switch Animation */}
        <AnimatePresence>
          {showModelSwitch && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-green-500/10 border-b border-white/10"
            >
              <div className="px-4 py-3 flex items-center justify-center gap-3">
                <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                <span className="text-sm text-purple-300">Switching to specialist model...</span>
                <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="h-[300px] md:h-[400px] overflow-y-auto p-4 md:p-6 space-y-4"
        >
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 text-white'
              }`}>
                <div className="text-sm md:text-base whitespace-pre-wrap">{msg.content}</div>
                {msg.model && (
                  <div className="mt-2 pt-2 border-t border-white/10 text-xs text-white/50">
                    {msg.model}
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {/* Typing indicator */}
          {typingText && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="max-w-[85%] rounded-2xl px-4 py-3 bg-white/10 text-white">
                <div className="text-sm md:text-base whitespace-pre-wrap">
                  {typingText}
                  <span className="inline-block w-2 h-4 ml-1 bg-white animate-pulse" />
                </div>
              </div>
            </motion.div>
          )}

          {messages.length === 0 && !typingText && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500">
                <Brain className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">Starting conversation...</p>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar (decorative) */}
        <div className="px-4 md:px-6 py-3 md:py-4 border-t border-white/10 bg-black/40">
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-white/5 rounded-xl px-4 py-3 text-sm text-gray-400">
              Ask MOTHER anything...
            </div>
            <button className="p-3 bg-blue-600 rounded-xl hover:bg-blue-500 transition-colors">
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Play/Pause indicator */}
      <div className="text-center mt-4">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
        >
          {isPlaying ? '⏸ Demo playing...' : '▶ Click to resume'}
        </button>
      </div>
    </div>
  );
}
