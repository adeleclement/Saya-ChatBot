
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Info, MessageCircle } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full py-4 border-b border-lumi-purple/10 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="container max-w-6xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-lumi-purple to-lumi-pink flex items-center justify-center">
            <Heart size={16} className="text-white" />
          </div>
          <h1 className="text-xl font-display font-bold text-lumi-purple">Lumi</h1>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-lumi-gray-dark hover:text-lumi-purple transition-colors">Home</a>
          <a href="#chat" className="text-lumi-gray-dark hover:text-lumi-purple transition-colors">Chat with Lumi</a>
          <a href="#resources" className="text-lumi-gray-dark hover:text-lumi-purple transition-colors">Resources</a>
          <a href="#about" className="text-lumi-gray-dark hover:text-lumi-purple transition-colors">About</a>
        </nav>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex gap-2 rounded-full border-lumi-purple/20 text-lumi-purple-dark">
            <Info size={16} />
            <span>Learn more</span>
          </Button>
          <Button size="sm" className="rounded-full bg-lumi-purple text-white hover:bg-lumi-purple-dark flex gap-2 items-center">
            <MessageCircle size={16} />
            <span className="hidden md:inline">Start chatting</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
