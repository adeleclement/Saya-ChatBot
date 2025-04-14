
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Info, MessageCircle, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { GlowMenuDemo } from './ui/glow-menu-demo';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { label: 'Chat', href: location.pathname === '/' ? '#chat' : '/#chat' },
    { label: 'Resources', href: '/resources' },
    { label: 'About', href: '/about' }
  ];

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

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
          <Link to="/" className="flex items-center gap-2">
            <h1 className="text-xl font-display font-bold bg-gradient-to-r from-lumi-purple to-lumi-purple-dark bg-clip-text text-transparent">Saya</h1>
          </Link>
        </motion.div>
        
        <div className="hidden md:flex items-center">
          <GlowMenuDemo />
        </div>
        
        <div className="flex items-center gap-2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link to="/signup">
              <Button 
                variant="outline" 
                size="sm" 
                className="hidden md:flex gap-2 rounded-full border-lumi-purple/20 text-lumi-purple-dark hover:bg-lumi-purple/5"
              >
                <Info size={16} />
                <span>Sign Up</span>
              </Button>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link to="/signin">
              <Button 
                size="sm" 
                className="rounded-full bg-gradient-to-br from-lumi-purple to-lumi-purple-dark text-white hover:opacity-90 flex gap-2 items-center transition-all shadow-md hover:shadow-lg"
              >
                <MessageCircle size={16} />
                <span className="hidden md:inline">Sign In</span>
              </Button>
            </Link>
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
              {navigation.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {item.href.startsWith('#') || item.href.includes('/#') ? (
                    <a 
                      href={item.href} 
                      className="text-lumi-gray-dark px-4 py-3 rounded-lg hover:bg-lumi-purple/5 hover:text-lumi-purple transition-colors block"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link 
                      to={item.href} 
                      className={`text-lumi-gray-dark px-4 py-3 rounded-lg hover:bg-lumi-purple/5 hover:text-lumi-purple transition-colors block ${
                        location.pathname === item.href ? 'text-lumi-purple bg-lumi-purple/5' : ''
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div
                className="px-4 pt-4 mt-4 border-t border-lumi-purple/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <Link to="/signup">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-2 rounded-lg border-lumi-purple/20 text-lumi-purple-dark hover:bg-lumi-purple/5 mb-3"
                  >
                    <Info size={18} />
                    <span>Sign Up</span>
                  </Button>
                </Link>
                <Link to="/signin">
                  <Button 
                    className="w-full justify-start gap-2 rounded-lg bg-gradient-to-br from-lumi-purple to-lumi-purple-dark text-white hover:opacity-90 transition-all"
                  >
                    <MessageCircle size={18} />
                    <span>Sign In</span>
                  </Button>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
