
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Info, MessageCircle, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`w-full py-4 border-b transition-all duration-300 sticky top-0 z-50 ${
        scrolled 
          ? 'border-lumi-purple/10 bg-white/90 backdrop-blur-md shadow-sm' 
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="container max-w-6xl mx-auto px-4 flex items-center justify-between">
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-lumi-purple to-lumi-pink flex items-center justify-center">
            <Heart size={16} className="text-white" />
          </div>
          <h1 className="text-xl font-display font-bold bg-gradient-to-r from-lumi-purple to-lumi-purple-dark bg-clip-text text-transparent">Lumi</h1>
        </motion.div>
        
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: 'Home', href: '#' },
            { label: 'Chat with Lumi', href: '#chat' },
            { label: 'Resources', href: '#resources' },
            { label: 'About', href: '#about' }
          ].map((item, index) => (
            <motion.a 
              key={item.label}
              href={item.href} 
              className="text-lumi-gray-dark hover:text-lumi-purple transition-colors relative group"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-lumi-purple group-hover:w-full transition-all duration-300"></span>
            </motion.a>
          ))}
        </nav>
        
        <div className="flex items-center gap-2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden md:flex gap-2 rounded-full border-lumi-purple/20 text-lumi-purple-dark hover:bg-lumi-purple/5"
            >
              <Info size={16} />
              <span>Learn more</span>
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button 
              size="sm" 
              className="rounded-full bg-gradient-to-br from-lumi-purple to-lumi-purple-dark text-white hover:opacity-90 flex gap-2 items-center transition-all shadow-md hover:shadow-lg"
              onClick={() => document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <MessageCircle size={16} />
              <span className="hidden md:inline">Start chatting</span>
            </Button>
          </motion.div>
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden fixed inset-0 top-[73px] bg-white z-40 p-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col gap-4 py-4">
              {[
                { label: 'Home', href: '#' },
                { label: 'Chat with Lumi', href: '#chat' },
                { label: 'Resources', href: '#resources' },
                { label: 'About', href: '#about' }
              ].map((item, index) => (
                <motion.a 
                  key={item.label}
                  href={item.href} 
                  className="text-lumi-gray-dark px-4 py-3 rounded-lg hover:bg-lumi-purple/5 hover:text-lumi-purple transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.div
                className="px-4 pt-4 mt-4 border-t border-lumi-purple/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2 rounded-lg border-lumi-purple/20 text-lumi-purple-dark hover:bg-lumi-purple/5 mb-3"
                >
                  <Info size={18} />
                  <span>Learn more</span>
                </Button>
                <Button 
                  className="w-full justify-start gap-2 rounded-lg bg-gradient-to-br from-lumi-purple to-lumi-purple-dark text-white hover:opacity-90 transition-all"
                  onClick={() => {
                    document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' });
                    setMobileMenuOpen(false);
                  }}
                >
                  <MessageCircle size={18} />
                  <span>Start chatting</span>
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
