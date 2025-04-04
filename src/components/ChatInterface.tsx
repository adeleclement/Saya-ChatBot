
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SendHorizontal, User, Heart, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { useChatContext, Message } from '@/context/ChatContext';
import { useToast } from '@/hooks/use-toast';

const ChatInterface = () => {
  const { 
    currentConversation, 
    addMessage, 
    startNewConversation, 
    guestMessageCount, 
    isTyping 
  } = useChatContext();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isSignedIn } = useAuth();
  const { toast } = useToast();

  // Initialize conversation if needed
  useEffect(() => {
    if (!currentConversation) {
      startNewConversation();
    }
  }, [currentConversation, startNewConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [currentConversation?.messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    // Check guest message limit
    if (!isSignedIn && guestMessageCount >= 5) {
      toast({
        title: "Message limit reached",
        description: "Sign in to continue chatting and save your conversations.",
        action: (
          <Link to="/sign-in" className="bg-lumi-purple hover:bg-lumi-purple-dark text-white px-3 py-1 rounded-md text-xs">
            Sign in
          </Link>
        ),
      });
      return;
    }
    
    // Add user message
    const userMessage: Message = { type: 'user', content: inputText };
    addMessage(userMessage);
    setInputText('');
    
    // Simulate assistant response after a delay
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
      
      const assistantMessage: Message = { type: 'assistant', content: responseContent };
      addMessage(assistantMessage);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const regenerateLastResponse = () => {
    if (currentConversation && currentConversation.messages.length > 1) {
      // Filter out the last assistant message
      const messages = [...currentConversation.messages];
      const lastMessageIndex = messages.length - 1;
      
      if (messages[lastMessageIndex].type === 'assistant') {
        // Remove last message
        const newMessages = messages.slice(0, -1);
        
        // Simulate regenerating a response
        setTimeout(() => {
          const newResponse: Message = { 
            type: 'assistant', 
            content: "I've thought about this further. Women's health is a complex and important field that encompasses physical, mental, and social well-being. Let me know if you'd like me to focus on a specific aspect, and I'll provide more tailored information." 
          };
          
          addMessage(newResponse);
        }, 1500);
      }
    }
  };

  // If no conversation exists yet, return empty div (will be populated in useEffect)
  if (!currentConversation) {
    return <div></div>;
  }

  return (
    <section id="chat" className="py-16 bg-gradient-to-br from-white to-lumi-purple/5">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-display font-bold text-lumi-purple-dark mb-4">Chat with Lumi</h2>
          <p className="text-lumi-gray-dark max-w-2xl mx-auto">
            Ask me about women's health, reproductive wellness, emotional wellbeing, or any other topics you're curious about.
          </p>
          {!isSignedIn && (
            <div className="mt-4 text-sm text-lumi-gray flex justify-center items-center gap-2">
              <span>Guest mode: {5 - guestMessageCount} messages remaining</span>
              <Link to="/sign-in" className="text-lumi-purple hover:text-lumi-purple-dark">
                Sign in to unlock unlimited conversations
              </Link>
            </div>
          )}
        </div>
        
        <div className="neo-card backdrop-blur-md bg-white/80 border border-lumi-purple/20 p-4 md:p-6 max-w-3xl mx-auto rounded-2xl shadow-soft transition-all hover:shadow-glow">
          <div className="h-[450px] overflow-y-auto mb-4 p-2 custom-scrollbar">
            <AnimatePresence initial={false}>
              {currentConversation.messages.map((message, index) => (
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
            
            {isTyping && (
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
                disabled={isTyping || (!isSignedIn && guestMessageCount >= 5)}
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping || (!isSignedIn && guestMessageCount >= 5)}
                className="rounded-full aspect-square p-3 bg-gradient-to-br from-lumi-purple to-lumi-purple-dark text-white hover:opacity-90 flex items-center justify-center transition-all shadow-md hover:shadow-lg"
                aria-label="Send message"
              >
                <SendHorizontal size={20} />
              </Button>
            </div>
            
            {currentConversation.messages.length > 1 && 
             currentConversation.messages[currentConversation.messages.length - 1].type === 'assistant' && (
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
