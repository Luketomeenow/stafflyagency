import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, User, Bot, Loader2, X, Minimize2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const FullScreenChatbot: React.FC = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Staffly AI. I can help you find the perfect virtual assistant for your business needs. What type of help are you looking for?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isFullScreen) {
      scrollToBottom();
    }
  }, [messages, isFullScreen]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    setIsTyping(true);

    // Smoothly transition to full screen when user sends a message
    if (!isFullScreen) {
      // Add a small delay for smooth transition
      setTimeout(() => {
        setIsFullScreen(true);
      }, 300);
    }

    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      if (!apiKey || apiKey === 'your_openai_api_key_here') {
        throw new Error('OpenAI API key not configured. Please check your .env file.');
      }

      // Simulate API call for now
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "I understand you're looking for help with that. Let me connect you with the perfect virtual assistant for your needs. What's your budget and timeline?",
          sender: 'bot',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
        setIsTyping(false);
      }, 2000);

    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, but the AI service is not properly configured. Please contact support to get this fixed.",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickResponses = [
    'Virtual Admin',
    'Customer Support', 
    'Social Media',
    'Data Entry',
    'Project Management'
  ];

  const handleQuickResponse = (response: string) => {
    setInputText(response);
    setTimeout(() => {
      setInputText(response);
      handleSendMessage();
    }, 100);
  };

  // Compact Chatbot (Hero Section)
  if (!isFullScreen) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 max-w-[90vw] mx-auto relative overflow-hidden"
      >
        {/* Chatbot Header */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg">Staffly AI</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-sm text-slate-700 font-medium">Online • Ready to help</p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
          <AnimatePresence>
            {messages.slice(0, 3).map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-xs ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user' 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
                      : 'bg-gradient-to-r from-slate-600 to-slate-700'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className={`px-4 py-3 rounded-2xl shadow-lg ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-md'
                      : 'bg-slate-100 text-slate-900 rounded-bl-md border border-slate-200'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {messages.length > 3 && (
            <div className="text-center">
              <button
                onClick={() => setIsFullScreen(true)}
                className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
              >
                View full conversation →
              </button>
            </div>
          )}
        </div>

        {/* Input Field */}
        <div className="flex space-x-3">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="What do you want to scale?"
            disabled={isLoading}
            className="flex-1 px-5 py-3 bg-white/80 border-2 border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg text-slate-900 font-medium disabled:opacity-50 placeholder-slate-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputText.trim()}
            className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Expand Button */}
        <button
          onClick={() => setIsFullScreen(true)}
          className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          <Minimize2 className="w-4 h-4" />
        </button>
      </motion.div>
    );
  }

  // Full Screen Chatbot
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="fixed inset-0 z-50 bg-gradient-to-br from-slate-50 via-white to-blue-50"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Staffly AI Assistant</h2>
              <p className="text-slate-600">Your virtual assistant specialist</p>
            </div>
          </div>
          
          <button
            onClick={() => setIsFullScreen(false)}
            className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex h-[calc(100vh-120px)]">
          {/* Left Side - Chat Interface */}
          <div className="w-4/5 border-r border-slate-200 p-6 flex flex-col">
            <div className="flex-1 space-y-4 mb-6 overflow-y-auto max-h-full">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-3 max-w-md ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === 'user' 
                          ? 'bg-gradient-to-r from-blue-400 to-purple-400' 
                          : 'bg-gradient-to-r from-slate-400 to-slate-500'
                      }`}>
                        {message.sender === 'user' ? (
                          <User className="w-5 h-5 text-white" />
                        ) : (
                          <Bot className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div className={`px-6 py-4 rounded-2xl shadow-lg ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-md'
                          : 'bg-slate-100 text-slate-900 rounded-bl-md border border-slate-200'
                      }`}>
                        <p className="text-base leading-relaxed">{message.text}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-slate-400 to-slate-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-white/10 px-6 py-4 rounded-2xl rounded-bl-md">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce"></div>
                        <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Section */}
            <div className="space-y-4">
              {/* Input Field */}
              <div className="flex space-x-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="What do you want to scale?"
                  disabled={isLoading}
                  className="flex-1 px-6 py-4 bg-white/80 border-2 border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg text-slate-900 font-medium disabled:opacity-50 placeholder-slate-500 text-lg"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputText.trim()}
                  className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <Send className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - AI Output/Results */}
          <div className="w-1/2 p-6">
            <div className="h-full bg-slate-50 rounded-2xl border border-slate-200 p-6 overflow-y-auto">
              <h3 className="text-xl font-bold text-slate-900 mb-4">AI Analysis & Recommendations</h3>
              
              {messages.length <= 1 ? (
                <div className="text-center text-slate-600 mt-20">
                  <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50 text-slate-500" />
                  <p className="text-lg text-slate-800">Start a conversation to see AI insights</p>
                  <p className="text-sm mt-2 text-slate-700">The AI will analyze your needs and provide personalized recommendations</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-4 border border-blue-500/30">
                    <h4 className="font-semibold text-slate-800 mb-2">💡 AI Insight</h4>
                    <p className="text-slate-800">Based on your request, I recommend focusing on these key areas for your virtual assistant needs.</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-4 border border-green-500/30">
                    <h4 className="font-semibold text-slate-800 mb-2">🎯 Recommended Services</h4>
                    <ul className="text-slate-800 space-y-2">
                      <li>• Executive Assistant support</li>
                      <li>• Project coordination</li>
                      <li>• Customer experience management</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-500/30">
                    <h4 className="font-semibold text-slate-800 mb-2">💰 Estimated Budget</h4>
                    <p className="text-slate-800">Based on your requirements, expect to invest $1,800 - $2,500/month for quality virtual assistants.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FullScreenChatbot;
