
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SendHorizontal, User, Heart } from 'lucide-react';

interface Message {
  type: 'user' | 'assistant';
  content: string;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'assistant',
      content: "Hello! I'm Lumi, your caring companion for women's health and wellbeing. How can I support you today?"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <section id="chat" className="py-16 bg-white">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-display font-bold text-lumi-purple-dark mb-4">Chat with Lumi</h2>
          <p className="text-lumi-gray-dark max-w-2xl mx-auto">
            Ask me about women's health, reproductive wellness, emotional wellbeing, or any other topics you're curious about.
          </p>
        </div>
        
        <div className="lumi-card p-4 md:p-6 max-w-3xl mx-auto">
          <div className="h-96 overflow-y-auto mb-4 p-2">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] rounded-2xl p-3 ${
                  message.type === 'user' 
                    ? 'bg-lumi-purple text-white rounded-tr-none' 
                    : 'bg-lumi-gray-light text-lumi-gray-dark rounded-tl-none'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    {message.type === 'assistant' ? (
                      <>
                        <Heart size={14} className="text-lumi-purple" />
                        <span className="font-medium text-lumi-purple-dark">Lumi</span>
                      </>
                    ) : (
                      <>
                        <User size={14} />
                        <span className="font-medium">You</span>
                      </>
                    )}
                  </div>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-lumi-gray-light text-lumi-gray-dark rounded-2xl rounded-tl-none p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Heart size={14} className="text-lumi-purple" />
                    <span className="font-medium text-lumi-purple-dark">Lumi</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-lumi-purple animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-lumi-purple animate-pulse delay-100"></div>
                    <div className="w-2 h-2 rounded-full bg-lumi-purple animate-pulse delay-200"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex gap-2">
            <textarea 
              className="lumi-input w-full resize-none"
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
              className="rounded-full aspect-square p-3 bg-lumi-purple text-white hover:bg-lumi-purple-dark flex items-center justify-center"
            >
              <SendHorizontal size={20} />
            </Button>
          </div>
          
          <p className="text-xs text-lumi-gray text-center mt-4">
            Lumi provides general information and support, not professional medical advice.
            Always consult healthcare providers for medical concerns.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ChatInterface;
