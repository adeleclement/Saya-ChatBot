
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface Message {
  type: 'user' | 'assistant';
  content: string;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

interface ChatContextType {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  loading: boolean;
  guestMessageCount: number;
  isTyping: boolean;
  setCurrentConversation: (conversation: Conversation | null) => void;
  startNewConversation: () => void;
  deleteConversation: (id: string) => void;
  renameConversation: (id: string, newTitle: string) => void;
  addMessage: (message: Message) => void;
  getConversation: (id: string) => Conversation | undefined;
  getGuestMode: () => boolean;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: React.ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);
  const [guestMessageCount, setGuestMessageCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  // Mocking auth state for development
  const isSignedIn = false;
  const userId = "mock-user-id";
  const { toast } = useToast();

  // Initialize or load conversations
  useEffect(() => {
    if (isSignedIn && userId) {
      // In a real app, we'd fetch from a database here
      const storedConversations = localStorage.getItem(`conversations-${userId}`);
      if (storedConversations) {
        try {
          const parsed = JSON.parse(storedConversations);
          // Convert string dates back to Date objects
          const conversationsWithDates = parsed.map((conv: any) => ({
            ...conv,
            createdAt: new Date(conv.createdAt),
            updatedAt: new Date(conv.updatedAt)
          }));
          setConversations(conversationsWithDates);
        } catch (e) {
          console.error("Failed to parse stored conversations", e);
          setConversations([]);
        }
      }
    } else {
      // Guest mode - load from session storage
      const guestCount = sessionStorage.getItem('guestMessageCount');
      if (guestCount) {
        setGuestMessageCount(parseInt(guestCount, 10));
      }
      
      const currentGuestConv = sessionStorage.getItem('guestConversation');
      if (currentGuestConv) {
        try {
          const parsed = JSON.parse(currentGuestConv);
          setCurrentConversation({
            ...parsed,
            createdAt: new Date(parsed.createdAt),
            updatedAt: new Date(parsed.updatedAt)
          });
        } catch (e) {
          console.error("Failed to parse guest conversation", e);
        }
      }
    }
    setLoading(false);
  }, [isSignedIn, userId]);

  // Save conversations when they change
  useEffect(() => {
    if (isSignedIn && userId && conversations.length > 0) {
      localStorage.setItem(`conversations-${userId}`, JSON.stringify(conversations));
    }
  }, [conversations, isSignedIn, userId]);

  // Save guest conversation when it changes
  useEffect(() => {
    if (!isSignedIn && currentConversation) {
      sessionStorage.setItem('guestConversation', JSON.stringify(currentConversation));
    }
  }, [currentConversation, isSignedIn]);

  // Save guest message count
  useEffect(() => {
    if (!isSignedIn) {
      sessionStorage.setItem('guestMessageCount', guestMessageCount.toString());
    }
  }, [guestMessageCount, isSignedIn]);

  const startNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: 'New Conversation',
      messages: [
        {
          type: 'assistant',
          content: "Hello! I'm Lumi, your caring companion for women's health and wellbeing. How can I support you today?"
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    if (isSignedIn) {
      setConversations(prev => [newConversation, ...prev]);
    }
    
    setCurrentConversation(newConversation);
    return newConversation;
  };

  const deleteConversation = (id: string) => {
    setConversations(prev => prev.filter(conv => conv.id !== id));
    if (currentConversation?.id === id) {
      setCurrentConversation(null);
    }
    
    toast({
      title: "Conversation deleted",
      description: "Your conversation has been successfully deleted.",
    });
  };

  const renameConversation = (id: string, newTitle: string) => {
    setConversations(prev => 
      prev.map(conv => 
        conv.id === id 
          ? { ...conv, title: newTitle, updatedAt: new Date() } 
          : conv
      )
    );
    
    if (currentConversation?.id === id) {
      setCurrentConversation({ ...currentConversation, title: newTitle, updatedAt: new Date() });
    }
  };

  const addMessage = (message: Message) => {
    if (!isSignedIn) {
      // Guest mode message counting
      if (message.type === 'user') {
        const newCount = guestMessageCount + 1;
        setGuestMessageCount(newCount);
        
        // Show login prompt after 5 messages
        if (newCount >= 5) {
          setTimeout(() => {
            toast({
              title: "Message limit reached",
              description: "Sign in to continue chatting and save your conversations.",
              action: (
                <a href="/sign-in" className="bg-lumi-purple hover:bg-lumi-purple-dark text-white px-3 py-1 rounded-md text-xs">
                  Sign in
                </a>
              ),
            });
          }, 1500);
        }
      }
    }
    
    if (currentConversation) {
      const updatedConversation = {
        ...currentConversation,
        messages: [...currentConversation.messages, message],
        updatedAt: new Date()
      };
      
      // Generate a title from the first user message if it's a new conversation
      if (updatedConversation.title === 'New Conversation' && message.type === 'user' && updatedConversation.messages.length <= 2) {
        // Truncate the message to create a title
        const newTitle = message.content.length > 30 
          ? message.content.substring(0, 27) + '...' 
          : message.content;
        updatedConversation.title = newTitle;
      }
      
      setCurrentConversation(updatedConversation);
      
      if (isSignedIn) {
        setConversations(prev => 
          prev.map(conv => 
            conv.id === updatedConversation.id ? updatedConversation : conv
          )
        );
      }
      
      // Simulate typing indicator when user sends a message
      if (message.type === 'user') {
        setIsTyping(true);
        // The actual response is handled in the ChatInterface component
      }
    }
  };

  const getConversation = (id: string) => {
    return conversations.find(conv => conv.id === id);
  };

  const getGuestMode = () => {
    return !isSignedIn;
  };

  return (
    <ChatContext.Provider value={{
      conversations,
      currentConversation,
      loading,
      guestMessageCount,
      isTyping,
      setCurrentConversation,
      startNewConversation,
      deleteConversation,
      renameConversation,
      addMessage,
      getConversation,
      getGuestMode
    }}>
      {children}
    </ChatContext.Provider>
  );
};
