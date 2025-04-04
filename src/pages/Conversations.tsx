
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  MessageCircle, Trash2, Pencil, MoreVertical, Plus, Heart 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChatProvider, useChatContext } from '@/context/ChatContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const ConversationCard = ({ id, title, messages, updatedAt }: {
  id: string;
  title: string;
  messages: {type: 'user' | 'assistant', content: string}[];
  updatedAt: Date;
}) => {
  const { deleteConversation, renameConversation } = useChatContext();
  const navigate = useNavigate();
  const [isRenaming, setIsRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  // Get the first message from the user, if any
  const firstUserMessage = messages.find(msg => msg.type === 'user');
  const preview = firstUserMessage ? firstUserMessage.content : "No messages yet";
  
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteConversation(id);
  };

  const handleRename = () => {
    if (newTitle.trim() && newTitle !== title) {
      renameConversation(id, newTitle.trim());
    }
    setIsRenaming(false);
  };

  const handleNavigate = () => {
    navigate(`/conversations/${id}`);
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(updatedAt);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-4 rounded-xl border border-lumi-purple/10 bg-white shadow-sm hover:shadow-md transition-all cursor-pointer"
      onClick={handleNavigate}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-lumi-purple/10 flex items-center justify-center">
            <MessageCircle size={16} className="text-lumi-purple" />
          </div>
          {isRenaming ? (
            <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
              <Input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="h-8 text-sm py-1 px-2 border-lumi-purple/30 focus:border-lumi-purple"
                autoFocus
              />
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={handleRename}
                className="h-8 text-xs p-1 text-lumi-purple hover:text-lumi-purple-dark"
              >
                Save
              </Button>
            </div>
          ) : (
            <h3 className="font-medium text-lumi-purple-dark">{truncateText(title, 35)}</h3>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={e => e.stopPropagation()}>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical size={16} className="text-lumi-gray" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={(e) => {
              e.stopPropagation();
              setIsRenaming(true);
            }}>
              <Pencil size={14} className="mr-2" />
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive" onClick={handleDelete}>
              <Trash2 size={14} className="mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p className="text-sm text-lumi-gray-dark line-clamp-2 mb-3">{truncateText(preview, 100)}</p>
      <div className="text-xs text-lumi-gray mt-2">{formattedDate}</div>
    </motion.div>
  );
};

const ConversationsContent = () => {
  const { conversations, startNewConversation } = useChatContext();
  const navigate = useNavigate();
  
  const handleNewConversation = () => {
    const newConv = startNewConversation();
    navigate(`/conversations/${newConv.id}`);
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold text-lumi-purple-dark">My Conversations</h1>
        <Button 
          onClick={handleNewConversation}
          className="rounded-full bg-gradient-to-br from-lumi-purple to-lumi-purple-dark text-white hover:opacity-90 flex gap-2 items-center transition-all shadow-md hover:shadow-lg"
        >
          <Plus size={16} />
          <span>New Conversation</span>
        </Button>
      </div>

      {conversations.length === 0 ? (
        <div className="text-center py-16">
          <div className="mx-auto w-16 h-16 rounded-full bg-lumi-purple/10 flex items-center justify-center mb-4">
            <Heart size={32} className="text-lumi-purple" />
          </div>
          <h3 className="text-xl font-display font-semibold text-lumi-purple-dark mb-2">
            No conversations yet
          </h3>
          <p className="text-lumi-gray-dark mb-6 max-w-md mx-auto">
            Start your first conversation with Lumi and it will appear here.
          </p>
          <Button 
            onClick={handleNewConversation}
            className="rounded-full bg-gradient-to-br from-lumi-purple to-lumi-purple-dark text-white hover:opacity-90 flex gap-2 items-center transition-all shadow-md hover:shadow-lg mx-auto"
          >
            <MessageCircle size={16} />
            <span>Start chatting</span>
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          <AnimatePresence>
            {conversations.map((conversation) => (
              <ConversationCard 
                key={conversation.id} 
                id={conversation.id}
                title={conversation.title}
                messages={conversation.messages}
                updatedAt={conversation.updatedAt}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

const Conversations = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gradient-to-br from-white to-lumi-purple/5">
        <ChatProvider>
          <ConversationsContent />
        </ChatProvider>
      </main>
      <Footer />
    </div>
  );
};

export default Conversations;
