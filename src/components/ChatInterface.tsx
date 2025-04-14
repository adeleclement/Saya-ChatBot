import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SendHorizontal, User, Heart, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  type: 'user' | 'assistant';
  content: string;
  isTyping?: boolean;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'assistant' as const,
      content: "Hello! I'm Saya, your caring companion for women's health and wellbeing. How can I support you today?"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const webhookUrl = "https://hook.eu2.make.com/bujbos6s17kfulplbqi0eq4w1hvo26ou";

  useEffect(() => {
    const scrollTimer = setTimeout(() => {
      scrollToBottom();
    }, 100);
    
    return () => clearTimeout(scrollTimer);
  }, [messages]);

  useEffect(() => {
    const typingMessage = messages.find(msg => msg.isTyping);
    if (typingMessage) {
      scrollToBottom();
    }
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const extractContent = (data: any): string => {
    console.log("Extracting content from:", data);
    
    if (typeof data === 'string') {
      try {
        const parsed = JSON.parse(data);
        if (parsed && parsed.content) return parsed.content;
        if (parsed && typeof parsed === 'string') return parsed;
      } catch (e) {
        return data;
      }
    }
    
    if (data && data.content) return data.content;
    if (data && data.reply && data.reply.content) return data.reply.content;
    if (data && data.reply) {
      if (typeof data.reply === 'string') return data.reply;
      if (typeof data.reply === 'object' && data.reply.content) return data.reply.content;
    }
    
    return typeof data === 'object' ? JSON.stringify(data) : String(data);
  };

  const typeMessage = (content: string, messageIndex: number) => {
    const textToType = content;
    let currentIndex = 0;
    
    setMessages(prev => {
      const updated = [...prev];
      updated[messageIndex] = {
        ...updated[messageIndex],
        content: "",
        isTyping: true
      };
      return updated;
    });
    
    const typingInterval = setInterval(() => {
      if (currentIndex < textToType.length) {
        setMessages(prev => {
          const updated = [...prev];
          updated[messageIndex] = {
            ...updated[messageIndex],
            content: textToType.substring(0, currentIndex + 1),
            isTyping: true
          };
          return updated;
        });
        currentIndex++;
        scrollToBottom();
      } else {
        clearInterval(typingInterval);
        setMessages(prev => {
          const updated = [...prev];
          updated[messageIndex] = {
            ...updated[messageIndex],
            isTyping: false
          };
          return updated;
        });
        scrollToBottom();
      }
    }, 20);
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
        }),
      });
      
      console.log("Raw response status:", response.status);
      const responseText = await response.text();
      console.log("Raw response text:", responseText);
      
      let parsedData;
      let contentToShow = "";
      
      try {
        parsedData = JSON.parse(responseText);
        console.log("Parsed webhook response:", parsedData);
        contentToShow = extractContent(parsedData);
      } catch (parseError) {
        console.log("Response is not JSON, using as plain text");
        contentToShow = responseText;
      }
      
      console.log("Final content to display:", contentToShow);
      
      const newMessageIndex = newMessages.length;
      setMessages([...newMessages, { 
        type: 'assistant',
        content: "",
        isTyping: true
      }]);
      
      setTimeout(() => {
        typeMessage(contentToShow, newMessageIndex);
      }, 500);
      
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
            }),
          });
          
          console.log("Raw regenerated response status:", response.status);
          const responseText = await response.text();
          console.log("Raw regenerated response text:", responseText);
          
          let parsedData;
          let contentToShow = "";
          
          try {
            parsedData = JSON.parse(responseText);
            console.log("Parsed regenerated response:", parsedData);
            contentToShow = extractContent(parsedData);
          } catch (parseError) {
            console.log("Regenerated response is not JSON, using as plain text");
            contentToShow = responseText;
          }
          
          console.log("Final regenerated content to display:", contentToShow);
          
          const newMessages = [...messages.slice(0, messages.length - 1)];
          const newMessageIndex = newMessages.length;
          
          setMessages([...newMessages, { 
            type: 'assistant',
            content: "",
            isTyping: true
          }]);
          
          setTimeout(() => {
            typeMessage(contentToShow, newMessageIndex);
          }, 500);
          
        } catch (error) {
          console.error('Error regenerating response:', error);
          toast({
            title: "Connection Error",
            description: "Couldn't regenerate the response. Please try again.",
            variant: "destructive",
          });
          
          setMessages(prev => [...prev.slice(0, prev.length - 1), { 
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
          <h2 className="text-3xl font-display font-bold text-lumi-purple-dark mb-4">Chat with Saya</h2>
          <p className="text-lumi-gray-dark max-w-2xl mx-auto">
            Ask me about women's health, reproductive wellness, emotional wellbeing, or any other topics you're curious about.
          </p>
        </div>
        
        <div className="neo-card backdrop-blur-md bg-white/80 border border-lumi-purple/20 p-4 md:p-6 max-w-3xl mx-auto rounded-2xl shadow-soft transition-all hover:shadow-glow">
          <ScrollArea className="h-[450px] mb-4 p-2 custom-scrollbar">
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
                          <span className="font-medium text-lumi-purple-dark">Saya</span>
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
                    <p className="whitespace-pre-wrap">
                      {message.content}
                      {message.isTyping && (
                        <span className="inline-block w-1 h-4 ml-1 bg-lumi-purple animate-pulse"></span>
                      )}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isLoading && !messages[messages.length - 1]?.isTyping && (
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
                    <span className="font-medium text-lumi-purple-dark">Saya</span>
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
          </ScrollArea>
          
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
            
            {messages.length > 1 && messages[messages.length - 1].type === 'assistant' && !messages[messages.length - 1].isTyping && (
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
              Saya provides general information and support, not professional medical advice.
              Always consult healthcare providers for medical concerns.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatInterface;
