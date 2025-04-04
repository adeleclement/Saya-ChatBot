
import React from 'react';
import Header from '@/components/Header';
import { Hero } from '@/components/ui/animated-hero';
import ChatInterface from '@/components/ChatInterface';
import ResourcesSection from '@/components/ResourcesSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <ChatInterface />
        <ResourcesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
