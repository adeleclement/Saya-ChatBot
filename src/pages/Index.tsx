
import React from 'react';
import Header from '@/components/Header';
import WelcomeHero from '@/components/WelcomeHero';
import ChatInterface from '@/components/ChatInterface';
import ResourcesSection from '@/components/ResourcesSection';
import Footer from '@/components/Footer';
import { ChatProvider } from '@/context/ChatContext';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <WelcomeHero />
        <ChatProvider>
          <ChatInterface />
        </ChatProvider>
        <ResourcesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
