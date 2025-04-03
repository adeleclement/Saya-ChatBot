
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, BookOpen, Heart } from 'lucide-react';

const WelcomeHero = () => {
  return (
    <section className="py-16 md:py-24 lumi-gradient-bg relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-48 -right-48 w-96 h-96 bg-lumi-pink/10 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute top-20 -left-24 w-64 h-64 bg-lumi-blue/10 rounded-full blur-3xl opacity-70"></div>
      </div>
      
      <div className="container max-w-6xl mx-auto px-4 relative">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-lumi-purple-dark mb-4 leading-tight">
              Your caring companion for women's wellbeing
            </h1>
            <p className="text-lg text-lumi-gray-dark mb-8">
              Lumi provides thoughtful, empathetic, and evidence-based guidance on women's health, reproductive wellness, and personal empowerment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="rounded-full bg-lumi-purple text-white hover:bg-lumi-purple-dark flex gap-2 items-center"
                onClick={() => document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <MessageCircle size={20} />
                <span>Chat with Lumi</span>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full border-lumi-purple/20 text-lumi-purple-dark hover:bg-lumi-purple/5 flex gap-2 items-center"
                onClick={() => document.getElementById('resources')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <BookOpen size={20} />
                <span>Explore resources</span>
              </Button>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-lumi-purple via-lumi-pink to-lumi-blue rounded-full opacity-20 blur-xl animate-pulse-gentle"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 md:w-56 md:h-56 bg-white/90 backdrop-blur rounded-full shadow-soft flex items-center justify-center animate-float">
                  <Heart size={80} className="text-lumi-purple" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {[
            {
              icon: <Heart className="w-10 h-10 text-lumi-pink" />,
              title: "Supportive & Compassionate",
              description: "Like having a caring friend by your side for any women's health questions"
            },
            {
              icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-lumi-purple"><path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.928-.255-.69-.19-1.543.546-2.097.255-.254.35-.691.225-1.012-.125-.322-.493-.526-.84-.526H12c-.347 0-.681.14-.926.384l-2.465 2.466c-.391.39-1.027.39-1.418 0l-.937-.937a1 1 0 0 1 0-1.415l3.992-3.992A.997.997 0 0 0 10.65 7h3.982c.438 0 .818-.26.969-.627.149-.367.069-.786-.217-1.072l-1.4-1.402C13.554 3.47 13 2.744 13 1.962s.553-1.51.986-1.942L14 0c.656 1.899 2.392 3.55 3.939 4.85.155.13.31.267.5.417.395.31.683.651.942 1.008.833 1.136.738 1.718.058 1.574z" /></svg>,
              title: "Evidence-Based Guidance",
              description: "Reliable information grounded in medical research and professional expertise"
            },
            {
              icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-lumi-blue"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><path d="M12 18v-6" /><path d="M8 18v-1" /><path d="M16 18v-3" /></svg>,
              title: "Holistic Wellbeing",
              description: "Addressing the physical, emotional, and social aspects of women's health"
            }
          ].map((feature, index) => (
            <div key={index} className="lumi-card p-6">
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-display font-semibold text-lumi-purple-dark mb-2">
                {feature.title}
              </h3>
              <p className="text-lumi-gray-dark">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WelcomeHero;
