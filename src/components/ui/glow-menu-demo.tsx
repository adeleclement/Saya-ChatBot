
import React, { useState } from 'react';
import { MenuBar } from './glow-menu';
import { MessageCircle, BookOpen, Info } from 'lucide-react';

export const GlowMenuDemo = () => {
  const [activeItem, setActiveItem] = useState('Chat');

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
