'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles } from 'lucide-react';

export const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <>
      <motion.button
        className="fixed bottom-24 right-6 z-40 w-14 h-14 glass-strong rounded-full flex items-center justify-center glow-purple"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <Sparkles size={24} className="text-primary" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="glass-strong rounded-2xl overflow-hidden shadow-2xl glow-purple">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Sparkles size={16} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-foreground">Ask Fauza&apos;s AI</h3>
                    <p className="text-xs text-muted-foreground">Powered by AI</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg hover:bg-white/10 transition-colors text-muted-foreground"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Chat Area */}
              <div className="h-64 p-4 overflow-y-auto">
                <div className="flex gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex-shrink-0 flex items-center justify-center">
                    <Sparkles size={14} className="text-white" />
                  </div>
                  <div className="glass rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                    <p className="text-sm text-foreground/90">
                      Hi! I&apos;m Fauza&apos;s AI assistant. Ask me anything about his projects, skills, or experience!
                    </p>
                  </div>
                </div>
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/10">
                <div className="flex items-center gap-2 glass rounded-xl px-3 py-2">
                  <input
                    type="text"
                    placeholder="Ask me anything..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                  />
                  <button className="p-2 rounded-lg bg-primary hover:bg-primary/80 transition-colors">
                    <Send size={16} className="text-primary-foreground" />
                  </button>
                </div>
                <p className="text-[10px] text-muted-foreground/50 text-center mt-2">
                  AI responses are for demonstration purposes
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
