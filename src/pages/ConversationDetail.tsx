
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { ChatProvider, useChatContext } from '@/context/ChatContext';
import ChatInterface from '@/components/ChatInterface';

const ConversationDetailContent = () => {
  const { id } = useParams<{id: string}>();
  const navigate = useNavigate();
  const { 
    conversations, 
    getConversation, 
    setCurrentConversation, 
    startNewConversation 
  } = useChatContext();
  
  // Set the current conversation based on the ID
  React.useEffect(() => {
    if (id) {
      const conversation = getConversation(id);
      if (conversation) {
        setCurrentConversation(conversation);
      } else {
        // If conversation not found, start a new one
        const newConv = startNewConversation();
        navigate(`/conversations/${newConv.id}`, { replace: true });
      }
    }
  }, [id, getConversation, setCurrentConversation, navigate, startNewConversation]);

  return (
    <div>
      <div className="container max-w-4xl mx-auto px-4 pt-4 pb-0">
        <Button
          variant="ghost"
          onClick={() => navigate('/conversations')}
          className="flex gap-2 text-lumi-purple hover:text-lumi-purple-dark mb-2"
        >
          <ArrowLeft size={16} />
          <span>Back to conversations</span>
        </Button>
      </div>
      
      <ChatInterface />
    </div>
  );
};

const ConversationDetail = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gradient-to-br from-white to-lumi-purple/5">
        <ChatProvider>
          <ConversationDetailContent />
        </ChatProvider>
      </main>
      <Footer />
    </div>
  );
};

export default ConversationDetail;
