
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SendHorizontal, User, Heart, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  type: 'user' | 'assistant';
  content: string;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'assistant' as const,
      content: "Hello! I'm Lumi, your caring companion for women's health and wellbeing. How can I support you today?"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    // Add user message
    const newMessages = [...messages, { type: 'user' as const, content: inputText }];
    setMessages(newMessages);
    setInputText('');
    
    // Simulate assistant response
    setIsLoading(true);
    setTimeout(() => {
      let responseContent = '';
      
      // Simple example responses based on keywords
      const lowercaseInput = inputText.toLowerCase();
      
      if (lowercaseInput.includes('period') || lowercaseInput.includes('menstruation')) {
        responseContent = "Menstruation is a natural part of a woman's reproductive cycle. If you're experiencing unusual symptoms or have specific questions about your period, I'm here to help. Remember that cycle lengths and flow can vary between individuals, and it's always a good idea to track your cycle to understand your own patterns.";
      } else if (lowercaseInput.includes('pregnancy') || lowercaseInput.includes('pregnant')) {
        responseContent = "Pregnancy is a significant journey with many physical and emotional changes. It's important to seek regular prenatal care if you are pregnant or think you might be. I can provide general information, but your healthcare provider should be your primary source of guidance during pregnancy.";
      } else if (lowercaseInput.includes('birth control') || lowercaseInput.includes('contraception')) {
        responseContent = "There are many birth control options available, each with different effectiveness rates, side effects, and considerations. The best choice depends on your personal health history, preferences, and needs. I recommend discussing these options with a healthcare provider who can help you make an informed decision.";
      } else {
        responseContent = "Thank you for sharing. Women's health encompasses many aspects of wellbeing, from physical health to emotional and social wellness. If you have a specific concern or topic you'd like to explore further, please let me know and I'll do my best to provide supportive, evidence-based information.";
      }
      
      setMessages([...newMessages, { type: 'assistant' as const, content: responseContent }]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const regenerateLastResponse = () => {
    if (messages.length > 1) {
      // Remove the last assistant message
      setMessages(prev => prev.slice(0, prev.length - 1));
      setIsLoading(true);
      
      // Simulate regenerating a response
      setTimeout(() => {
        const newResponse = "I've thought about this further. Women's health is a complex and important field that encompasses physical, mental, and social well-being. Let me know if you'd like me to focus on a specific aspect, and I'll provide more tailored information.";
        
        setMessages(prev => [...prev, { type: 'assistant' as const, content: newResponse }]);
        setIsLoading(false);
      }, 1500);
    }
  };

  return (
    <section id="chat" className="py-16 bg-gradient-to-br from-white to-lumi-purple/5">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-display font-bold text-lumi-purple-dark mb-4">Chat with Lumi</h2>
          <p className="text-lumi-gray-dark max-w-2xl mx-auto">
            Ask me about women's health, reproductive wellness, emotional wellbeing, or any other topics you're curious about.
          </p>
        </div>
        
        <div className="neo-card backdrop-blur-md bg-white/80 border border-lumi-purple/20 p-4 md:p-6 max-w-3xl mx-auto rounded-2xl shadow-soft transition-all hover:shadow-glow">
          <div className="h-[450px] overflow-y-auto mb-4 p-2 custom-scrollbar">
            <AnimatePresence initial={false}>
              {messages.map((message, index) => (
                <motion.div 
                  key={index} 
                  className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <div className={`max-w-[80%] rounded-2xl p-3 ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-br from-lumi-purple to-lumi-purple-dark text-white rounded-tr-none shadow-md' 
                      : 'bg-white border border-lumi-purple/10 text-lumi-gray-dark rounded-tl-none shadow-sm'
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                      {message.type === 'assistant' ? (
                        <>
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-lumi-pink to-lumi-purple flex items-center justify-center">
                            <Heart size={12} className="text-white" />
                          </div>
                          <span className="font-medium text-lumi-purple-dark">Lumi</span>
                        </>
                      ) : (
                        <>
                          <div className="w-5 h-5 rounded-full bg-lumi-gray-light flex items-center justify-center">
                            <User size={12} className="text-lumi-purple" />
                          </div>
                          <span className="font-medium text-white">You</span>
                        </>
                      )}
                    </div>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isLoading && (
              <motion.div 
                className="flex justify-start mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white border border-lumi-purple/10 text-lumi-gray-dark rounded-2xl rounded-tl-none p-3 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-lumi-pink to-lumi-purple flex items-center justify-center">
                      <Heart size={12} className="text-white" />
                    </div>
                    <span className="font-medium text-lumi-purple-dark">Lumi</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-lumi-purple animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-lumi-purple animate-bounce delay-100"></div>
                    <div className="w-2 h-2 rounded-full bg-lumi-purple animate-bounce delay-200"></div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <Textarea 
                className="lumi-input resize-none border-lumi-purple/20 focus:border-lumi-purple focus-visible:ring-1 focus-visible:ring-lumi-purple rounded-xl bg-white/80 backdrop-blur-sm transition-all"
                placeholder="Type your message here..."
                rows={1}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isLoading}
                className="rounded-full aspect-square p-3 bg-gradient-to-br from-lumi-purple to-lumi-purple-dark text-white hover:opacity-90 flex items-center justify-center transition-all shadow-md hover:shadow-lg"
                aria-label="Send message"
              >
                <SendHorizontal size={20} />
              </Button>
            </div>
            
            {messages.length > 1 && messages[messages.length - 1].type === 'assistant' && (
              <div className="flex justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-lumi-purple hover:text-lumi-purple-dark hover:bg-lumi-purple/5 rounded-full gap-2 text-xs"
                  onClick={regenerateLastResponse}
                >
                  <RefreshCw size={14} />
                  <span>Regenerate response</span>
                </Button>
              </div>
            )}
            
            <p className="text-xs text-lumi-gray text-center mt-2">
              Lumi provides general information and support, not professional medical advice.
              Always consult healthcare providers for medical concerns.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatInterface;
