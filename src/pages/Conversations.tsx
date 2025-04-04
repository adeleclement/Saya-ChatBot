
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { formatDistanceToNow } from 'date-fns';

// Define conversation type
interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  updatedAt: string | Date; // Accept both string and Date for flexibility
}

// Sample placeholder conversations
const placeholderConversations: Conversation[] = [
  {
    id: "1",
    title: "About Hormone Therapy",
    lastMessage: "What are the side effects of hormone replacement therapy?",
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
  },
  {
    id: "2",
    title: "Pregnancy Symptoms",
    lastMessage: "Is it normal to feel dizzy during the first trimester?",
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
  },
  {
    id: "3",
    title: "Menstrual Pain Relief",
    lastMessage: "What are some natural remedies for period cramps?",
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
  }
];

const Conversations = () => {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setConversations(placeholderConversations);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const createNewConversation = () => {
    // Create a new conversation object with a unique ID
    const newConversation: Conversation = {
      id: (Date.now()).toString(),
      title: "New Conversation",
      lastMessage: "Start a new conversation",
      updatedAt: new Date().toISOString(),
    };
    
    // Update state with the new conversation
    const updatedConversations = [newConversation, ...conversations];
    setConversations(updatedConversations);
    
    // Navigate to the new conversation
    navigate(`/conversations/${newConversation.id}`);
  };

  const formatDate = (dateString: string | Date) => {
    try {
      const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container max-w-5xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-display font-bold text-lumi-purple-dark">My Conversations</h1>
          <Button
            onClick={createNewConversation}
            className="bg-gradient-to-r from-lumi-purple to-lumi-pink hover:opacity-90 text-white flex items-center gap-2"
          >
            <PlusCircle size={18} />
            <span>New Conversation</span>
          </Button>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-lumi-purple">Loading conversations...</div>
          </div>
        ) : conversations.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No conversations yet</h2>
            <p className="text-gray-600 mb-6">Start a new conversation to get help and support</p>
            <Button
              onClick={createNewConversation}
              className="bg-gradient-to-r from-lumi-purple to-lumi-pink hover:opacity-90 text-white"
            >
              Start your first conversation
            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            {conversations.map((conversation, index) => (
              <motion.div
                key={conversation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link to={`/conversations/${conversation.id}`}>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow duration-200">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-lumi-purple-dark">{conversation.title}</h3>
                      <span className="text-sm text-gray-500">{formatDate(conversation.updatedAt)}</span>
                    </div>
                    <p className="text-gray-600 mt-1 text-sm line-clamp-1">{conversation.lastMessage}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Conversations;
