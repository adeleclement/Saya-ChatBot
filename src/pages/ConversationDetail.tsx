
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { ArrowLeft, Trash2, Edit2, MoreVertical, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Define conversation and message types
interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  updatedAt: Date;
  messages: Message[];
}

const ConversationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useUser();
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [inputMessage, setInputMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Fetch conversation from localStorage
    if (!id) return;
    
    const storedConversations = localStorage.getItem(`lumi-conversations-${user?.id}`);
    if (storedConversations) {
      const conversations: Conversation[] = JSON.parse(storedConversations);
      const currentConversation = conversations.find(conv => conv.id === id);
      
      if (currentConversation) {
        setConversation(currentConversation);
        setEditTitle(currentConversation.title);
      } else {
        navigate('/conversations');
      }
    }
  }, [id, user?.id, navigate]);

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !conversation || !user) return;

    // Create a new message
    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    // Update conversation with the new message
    const updatedConversation: Conversation = {
      ...conversation,
      lastMessage: inputMessage,
      updatedAt: new Date(),
      messages: [...conversation.messages, newMessage],
    };

    // Update state
    setConversation(updatedConversation);
    setInputMessage('');

    // Simulate bot typing
    setIsTyping(true);
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Thank you for sharing. How else can I help you today?',
        sender: 'bot',
        timestamp: new Date(),
      };

      const finalConversation: Conversation = {
        ...updatedConversation,
        lastMessage: botResponse.content,
        updatedAt: new Date(),
        messages: [...updatedConversation.messages, botResponse],
      };

      setConversation(finalConversation);
      setIsTyping(false);

      // Update localStorage
      const storedConversations = localStorage.getItem(`lumi-conversations-${user.id}`);
      if (storedConversations) {
        const conversations: Conversation[] = JSON.parse(storedConversations);
        const updatedConversations = conversations.map(conv => 
          conv.id === finalConversation.id ? finalConversation : conv
        );
        localStorage.setItem(`lumi-conversations-${user.id}`, JSON.stringify(updatedConversations));
      }
    }, 1500);
  };

  const handleTitleUpdate = () => {
    if (!editTitle.trim() || !conversation || !user) return;
    
    const updatedConversation = {
      ...conversation,
      title: editTitle,
    };
    
    setConversation(updatedConversation);
    setIsEditing(false);
    
    // Update in localStorage
    const storedConversations = localStorage.getItem(`lumi-conversations-${user.id}`);
    if (storedConversations) {
      const conversations: Conversation[] = JSON.parse(storedConversations);
      const updatedConversations = conversations.map(conv => 
        conv.id === updatedConversation.id ? updatedConversation : conv
      );
      localStorage.setItem(`lumi-conversations-${user.id}`, JSON.stringify(updatedConversations));
    }
  };

  const handleDeleteConversation = () => {
    if (!user || !conversation) return;
    
    // Remove from localStorage
    const storedConversations = localStorage.getItem(`lumi-conversations-${user.id}`);
    if (storedConversations) {
      const conversations: Conversation[] = JSON.parse(storedConversations);
      const updatedConversations = conversations.filter(conv => conv.id !== conversation.id);
      localStorage.setItem(`lumi-conversations-${user.id}`, JSON.stringify(updatedConversations));
      navigate('/conversations');
    }
  };

  if (!conversation) {
    return <div className="flex justify-center items-center h-screen">Loading conversation...</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-white to-lumi-purple/5">
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/conversations')}
              className="text-lumi-purple-dark"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            {isEditing ? (
              <div className="flex items-center space-x-2">
                <Input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="h-9"
                  autoFocus
                />
                <Button size="sm" onClick={handleTitleUpdate}>Save</Button>
                <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
              </div>
            ) : (
              <h1 className="text-lg font-semibold text-lumi-purple-dark">{conversation.title}</h1>
            )}
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5 text-lumi-purple-dark" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsEditing(true)}>
                <Edit2 className="mr-2 h-4 w-4" />
                <span>Rename</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500" onClick={handleDeleteConversation}>
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {conversation.messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] md:max-w-[70%] px-4 py-3 rounded-2xl ${
                message.sender === 'user' 
                  ? 'bg-gradient-to-br from-lumi-purple to-lumi-pink text-white' 
                  : 'bg-white border border-gray-100 shadow-sm text-gray-800'
              }`}
            >
              {message.content}
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-white border border-gray-100 shadow-sm rounded-2xl px-4 py-3">
              <div className="flex space-x-1">
                <motion.div
                  className="w-2 h-2 rounded-full bg-lumi-purple-dark"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
                />
                <motion.div
                  className="w-2 h-2 rounded-full bg-lumi-purple"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
                />
                <motion.div
                  className="w-2 h-2 rounded-full bg-lumi-pink"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="p-4 border-t border-gray-100 bg-white">
        <div className="container mx-auto flex space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button 
            onClick={handleSendMessage} 
            className="bg-gradient-to-r from-lumi-purple to-lumi-pink hover:opacity-90 text-white"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConversationDetail;
