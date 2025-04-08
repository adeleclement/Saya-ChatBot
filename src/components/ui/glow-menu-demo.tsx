
import React, { useState, useEffect } from 'react';
import { MenuBar } from './glow-menu';
import { MessageCircle, BookOpen, Info } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export const GlowMenuDemo = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('Chat');

  useEffect(() => {
    if (location.pathname === '/' || location.pathname.includes('/#chat')) {
      setActiveItem('Chat');
    } else if (location.pathname.includes('/resources')) {
      setActiveItem('Resources');
    } else if (location.pathname.includes('/about')) {
      setActiveItem('About');
    } else if (location.pathname.includes('/signin')) {
      setActiveItem('Sign In');
    } else if (location.pathname.includes('/signup')) {
      setActiveItem('Sign Up');
    }
  }, [location.pathname]);

  const menuItems = [
    {
      icon: MessageCircle,
      label: 'Chat',
      href: '/#chat',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      iconColor: 'text-purple-500'
    },
    {
      icon: BookOpen,
      label: 'Resources',
      href: '/resources',
      gradient: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
      iconColor: 'text-blue-500'
    },
    {
      icon: Info,
      label: 'About',
      href: '/about',
      gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ff8787 100%)',
      iconColor: 'text-red-500'
    }
  ];

  return (
    <MenuBar 
      items={menuItems} 
      activeItem={activeItem} 
      onItemClick={(label) => setActiveItem(label)} 
    />
  );
};
