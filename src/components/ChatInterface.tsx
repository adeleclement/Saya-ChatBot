import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SendHorizontal, User, Heart, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  
  const webhookUrl = "https://hook.eu2.make.com/bujbos6s17kfulplbqi0eq4w1hvo26ou";

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
    
    const newMessages = [...messages, { type: 'user' as const, content: inputText }];
    setMessages(newMessages);
    setInputText('');
    
    setIsLoading(true);
    
    try {
      console.log("Sending message to webhook:", inputText);
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputText,
          history: messages.map(msg => ({
            role: msg.type === 'user' ? 'user' : 'assistant',
            content: msg.content
          }))
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log("Webhook response:", data);
        
        const botResponse = data.Body || data.reply || data;
        
        const responseText = typeof botResponse === 'string' 
          ? botResponse 
          : botResponse.reply || botResponse.Body || JSON.stringify(botResponse);
        
        setMessages([...newMessages, { 
          type: 'assistant',
          content: responseText
        }]);
      } else {
        throw new Error('Failed to get a response');
      }
    } catch (error) {
      console.error('Error sending message to webhook:', error);
      toast({
        title: "Connection Error",
        description: "Couldn't connect to the assistant. Please try again later.",
        variant: "destructive",
      });
      
      setMessages([...newMessages, { 
        type: 'assistant',
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const regenerateLastResponse = async () => {
    if (messages.length > 1) {
      const lastUserMessageIndex = [...messages].reverse().findIndex(msg => msg.type === 'user');
      if (lastUserMessageIndex !== -1) {
        const userMessageIndex = messages.length - 1 - lastUserMessageIndex;
        const userMessage = messages[userMessageIndex];
        
        setMessages(prev => prev.slice(0, prev.length - 1));
        setIsLoading(true);
        
        try {
          console.log("Regenerating response for:", userMessage.content);
          
          const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              message: userMessage.content,
              regenerate: true,
              history: messages.slice(0, userMessageIndex + 1).map(msg => ({
                role: msg.type === 'user' ? 'user' : 'assistant',
                content: msg.content
              }))
            }),
          });
          
          if (response.ok) {
            const data = await response.json();
            console.log("Regenerated response:", data);
            
            const botResponse = data.Body || data.reply || data;
            
            const responseText = typeof botResponse === 'string' 
              ? botResponse 
              : botResponse.reply || botResponse.Body || JSON.stringify(botResponse);
            
            setMessages(prev => [...prev, { 
              type: 'assistant', 
              content: responseText
            }]);
          } else {
            throw new Error('Failed to get a regenerated response');
          }
        } catch (error) {
          console.error('Error regenerating response:', error);
          toast({
            title: "Connection Error",
            description: "Couldn't regenerate the response. Please try again.",
            variant: "destructive",
          });
          
          setMessages(prev => [...prev, { 
            type: 'assistant',
            content: "I'm sorry, I couldn't regenerate my response. Let's continue our conversation."
          }]);
        } finally {
          setIsLoading(false);
        }
      }
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
                className="lumi-input resize-none border-lumi-purple/20 focus:border-lumi-purple focus-visible:ring-1 focus:ring-lumi-purple rounded-xl bg-white/80 backdrop-blur-sm transition-all"
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
