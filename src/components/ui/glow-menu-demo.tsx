
"use client"

import { useState } from "react"
import { Home, MessageCircle, BookOpen, Info } from "lucide-react"
import { MenuBar } from "@/components/ui/glow-menu"
import { useLocation, useNavigate } from "react-router-dom";

const menuItems = [
  {
    icon: Home,
    label: "Home",
    href: "/",
    gradient:
      "radial-gradient(circle, rgba(155,135,245,0.2) 0%, rgba(155,135,245,0.1) 50%, rgba(155,135,245,0) 100%)",
    iconColor: "text-lumi-purple",
  },
  {
    icon: MessageCircle,
    label: "Chat",
    href: "/#chat",
    gradient:
      "radial-gradient(circle, rgba(216,180,254,0.2) 0%, rgba(216,180,254,0.1) 50%, rgba(216,180,254,0) 100%)",
    iconColor: "text-lumi-purple",
  },
  {
    icon: BookOpen,
    label: "Resources",
    href: "/resources",
    gradient:
      "radial-gradient(circle, rgba(192,132,252,0.2) 0%, rgba(192,132,252,0.1) 50%, rgba(192,132,252,0) 100%)",
    iconColor: "text-lumi-purple",
  },
  {
    icon: Info,
    label: "About",
    href: "/about",
    gradient:
      "radial-gradient(circle, rgba(168,85,247,0.2) 0%, rgba(168,85,247,0.1) 50%, rgba(168,85,247,0) 100%)",
    iconColor: "text-lumi-purple",
  },
]

export function GlowMenuDemo() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine active item based on current path
  const getInitialActiveItem = () => {
    const path = location.pathname;
    if (path === '/') return 'Home';
    if (path === '/resources') return 'Resources';
    if (path === '/about') return 'About';
    return 'Home';
  };
  
  const [activeItem, setActiveItem] = useState<string>(getInitialActiveItem());

  const handleItemClick = (label: string) => {
    setActiveItem(label);
    
    // Find the corresponding menu item
    const selectedItem = menuItems.find(item => item.label === label);
    if (selectedItem) {
      if (selectedItem.href.includes('#')) {
        // Handle hash links
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(selectedItem.href.split('#')[1]);
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        // Regular navigation
        navigate(selectedItem.href);
      }
    }
  };

  return (
    <MenuBar
      items={menuItems}
      activeItem={activeItem}
      onItemClick={handleItemClick}
      className="mx-auto"
    />
  )
}
