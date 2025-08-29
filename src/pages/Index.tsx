
import React from 'react';
import Header from '@/components/Header';
import { Hero } from '@/components/ui/animated-hero';
import WhySayaSection from '@/components/WhySayaSection';
import ChatInterface from '@/components/ChatInterface';
import ResourcesSection from '@/components/ResourcesSection';
import Footer from '@/components/Footer';
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <WhySayaSection />
        <ChatInterface />
        <ResourcesSection />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;
