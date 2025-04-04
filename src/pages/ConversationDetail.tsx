
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

// Define message and conversation types
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

// Placeholder conversations data
const getPlaceholderConversation = (id: string): Conversation => {
  const commonMessages = [
    {
      id: "m1",
      content: "Hello, I have a question about women's health.",
      sender: "user" as const,
      timestamp: new Date(Date.now() - 35 * 60000)
    },
    {
      id: "m2",
      content: "Of course! I'm here to help. What would you like to know about?",
      sender: "bot" as const,
      timestamp: new Date(Date.now() - 34 * 60000)
    }
  ];

  const conversations: Record<string, Conversation> = {
    "1": {
      id: "1",
      title: "About Hormone Therapy",
      lastMessage: "What are the risks associated with long-term HRT use?",
      updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      messages: [
        ...commonMessages,
        {
          id: "m3",
          content: "I'm considering hormone replacement therapy. What are the common side effects?",
          sender: "user",
          timestamp: new Date(Date.now() - 33 * 60000)
        },
        {
          id: "m4",
          content: "Hormone replacement therapy (HRT) can have various side effects including bloating, breast tenderness, nausea, headaches, and mood changes. These often improve within a few months of starting treatment. There are also some risks to consider, like slightly increased chances of blood clots and certain cancers. It's important to discuss your personal health history with your doctor to understand the specific risks and benefits for you.",
          sender: "bot",
          timestamp: new Date(Date.now() - 32 * 60000)
        },
        {
          id: "m5",
          content: "What are the risks associated with long-term HRT use?",
          sender: "user",
          timestamp: new Date(Date.now() - 30 * 60000)
        }
      ]
    },
    "2": {
      id: "2",
      title: "Pregnancy Symptoms",
      lastMessage: "Is it normal to feel dizzy during the first trimester?",
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      messages: [
        ...commonMessages,
        {
          id: "m3",
          content: "I'm 8 weeks pregnant and experiencing dizziness. Is this normal?",
          sender: "user",
          timestamp: new Date(Date.now() - 33 * 60000)
        },
        {
          id: "m4",
          content: "Yes, dizziness is quite common during early pregnancy. It's often caused by changes in blood pressure, blood sugar levels, and hormonal shifts. Make sure you're staying hydrated, eating regularly, and changing positions slowly. If the dizziness is severe, persistent, or accompanied by other concerning symptoms, please contact your healthcare provider.",
          sender: "bot",
          timestamp: new Date(Date.now() - 32 * 60000)
        },
        {
          id: "m5",
          content: "Is it normal to feel dizzy during the first trimester?",
          sender: "user",
          timestamp: new Date(Date.now() - 30 * 60000)
        }
      ]
    },
    "3": {
      id: "3",
      title: "Menstrual Pain Relief",
      lastMessage: "What are some natural remedies for period cramps?",
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      messages: [
        ...commonMessages,
        {
          id: "m3",
          content: "I experience severe menstrual cramps. Are there any natural remedies I could try?",
          sender: "user",
          timestamp: new Date(Date.now() - 33 * 60000)
        },
        {
          id: "m4",
          content: "Several natural approaches may help with menstrual cramps. Heat therapy like warm baths or heating pads can relax the muscles. Gentle exercise such as walking or yoga might reduce pain. Some find relief with herbal teas (ginger, chamomile), dietary changes (reducing caffeine, sugar), and ensuring adequate magnesium and omega-3 intake. Relaxation techniques like deep breathing and meditation may also help. If your pain is severe, please consult with your healthcare provider.",
          sender: "bot",
          timestamp: new Date(Date.now() - 32 * 60000)
        },
        {
          id: "m5",
          content: "What are some natural remedies for period cramps?",
          sender: "user",
          timestamp: new Date(Date.now() - 30 * 60000)
        }
      ]
    }
  };

  // Return the requested conversation or a default one if not found
  return conversations[id] || {
    id: id,
    title: "New Conversation",
    lastMessage: "Start a new conversation",
    updatedAt: new Date(),
    messages: []
  };
};

const ConversationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [inputMessage, setInputMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!id) {
      navigate('/conversations');
      return;
    }
    
    // Get placeholder conversation data
    const conv = getPlaceholderConversation(id);
    setConversation(conv);
    setEditTitle(conv.title);
  }, [id, navigate]);

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !conversation) return;

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
    }, 1500);
  };

  const handleTitleUpdate = () => {
    if (!editTitle.trim() || !conversation) return;
    
    const updatedConversation = {
      ...conversation,
      title: editTitle,
    };
    
    setConversation(updatedConversation);
    setIsEditing(false);
  };

  const handleDeleteConversation = () => {
    if (!conversation) return;
    navigate('/conversations');
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
